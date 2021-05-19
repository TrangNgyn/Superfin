const product_model = require('../models/product');
const categories_model = require('../models/categories')
const fs = require('fs');
const path = require('path');
const delete_object = require('../middleware/delete');
const {stripe_update_price} = require('../middleware/stripe_util');

var empty_field = { 
    succes: false,
    message: "All fields must be filled and present" 
}
class Product {

    // delete images referenced by product
    static delete_images(images) {
        for (var i = 0; i < images.length; i++) {
            delete_object(images[i])
        }
    }
    
    // @route   GET api/products/all-product
    // @desc    Get all itmes
    // @access  Public

    async get_all_products(req,res) {
        try{
            var products = await product_model.find({})
            if(products) {
                return res.json({ products })
            }
        }
        catch(err) {
            return res.json({
                success: false,
                message: err.message
            })
        }
    }

    // @route   POST api/products/product-by-id
    // @desc    Get all items sorted by code
    // @access  Public

    async post_product_by_id(req, res) {
        try{
            var { p_code } = req.body
            
            if(!p_code){
                return res.json(empty_field)
            }
            else {
                var product = await product_model.findOne({ p_code: p_code })
                if(product)
                    return res.json(product)
                else {
                    return res.json({ success: false,
                                      message: "Product was not found" })
                }
            }
        }
        catch (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }
    }

    // @route   POST api/products/product-by-category
    // @desc    Get products by category
    // @access  Public

    async post_product_by_category(req,res) {
        try{
            var { cat_id } = req.body
            if(!cat_id) {
                return res.json(empty_field)
            }
            else {
                var categories = await product_model.find({ p_catagories: cat_id })
                                                    .populate('p_categores','c_name')
                if(categories)
                    return res.json({ Categories: categories })
                else { 
                    res.status(404)
                    return res.json({ success: false,
                                      message: "The category was not found" })
                }
            }
        }
        catch (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }
    }

    // @route   POST api/products/product-by-category-price
    // @desc    Get products by category sorted by price
    // @acesss  Public 

    async post_product_by_category_price(req,res) {
        try{
            var { cat_id } = req.body
            if(!cat_id) {
                return res.json(empty_field)
            }
            else {
                var categories = await product_model.find({ p_categories: cat_id }).sort({ p_price: 1 })
                if(categories){
                    return res.json(categories)
                }
                else {
                    res.status(404)
                    return res.json({ success: false,
                                      message: "The category was not found" })
                }
            }
        }
        catch (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }
    }

    // @route   POST api/products/add-product
    // @desc    Create a product
    // @access  Public

    async post_add_product(req,res) {
        try {

            var { p_code, p_name, p_price, p_unit, 
                 p_size, p_categories, p_description } =  req.body  

            var images = req.images

            if(images.length <= 0) {
                Product.delete_images(images)
                return res.json({
                    succes: false,
                    message: "At least one image needs to be included"
                })
            }
            
            // validate that input was recieved
            if( !p_code | !p_name | !p_categories | !p_price | !p_size | !p_unit){
                Product.delete_images(images)
                return res.json(empty_field)
            }
            // validate name and code
            if( p_code.length > 255 || p_name.length > 255 || p_description.length > 512) {
                Product.delete_images(images)
                return res.json({ 
                    error: "Name and Code cannot be longer than 255 characters and description cannot be larger than 512 "
                })
            }
            // validate p_size type
            if(!Array.isArray(p_size)){
                Product.delete_images(images)
                return res.json({ 
                    error: "The product's size needs to be an array of all possible sizes (e.g. S, M, L or (W x H x D))"
                })
            }

            var found_category = await categories_model.findOne({ _id: p_categories })

            if(!found_category){
                Product.delete_images(images)
                return res.json({ success: false,
                                  message: `Product was not added - the category ${p_categories} is not valid`})
            }

            var matching_code = await product_model.findOne({ p_code: p_code })

            if(matching_code){
                Product.delete_images(images)
                return res.json({ success: false,
                                  message: `Product was not added, the p_code ${p_code} is already in use` })
            }
            // need too clean input here potentially to ensure that product addition is not corrupting the database

            const new_product = new product_model({
                p_image_uri: images,
                p_code,
                p_name,
                p_price,
                p_unit,
                p_size,
                p_categories,
                p_description
            })

            var saved_product = await new_product.save()
            if (saved_product) {    
                return res.json({ success: true,
                                message: `The product with code ${p_code} was added.` })
            }
            else {
                Product.delete_images(images)
                return res.json({ success: false,
                                message: "Product was not added"})
            }
        }
        catch (err) {
            Product.delete_images(images)
            return res.json({
                success: false,
                message: err.message
            })
        }
    }

    // @route   POST api/products/edit-product
    // @desc    edit an existing product
    // @access  Public

    async post_edit_product(req, res) {
        try {

            var { p_code, p_name, p_price, p_unit, p_size,
                 p_image_uri, p_categories, p_description } = req.body

            var locations = req.images

            const array = []

            // check that the image url has been defined
            if(typeof p_image_uri === 'undefined') {
                Product.delete_images(locations)
                return res.json(empty_field)
            }

            // make sure that there is at least an image for the edited product
            if(locations.length <= 0 && p_image_uri.length == 0) {
                Product.delete_images(locations)
                return res.json({ 
                    success: false,
                    message: `An image must be present in the edited product`
                })
            }

            // push images supplied from post to the array 
            if(typeof p_image_uri === 'string') {
                if(p_image_uri !== "")
                    array[0] = p_image_uri
            }
            else {
                for(var i = 0; i < p_image_uri.length; i++){
                    if(p_image_uri[i] !== "")
                        array.push(p_image_uri[i])
                }
            }

            // ensure all the required fields are present 
            if( !p_code | !p_name | !p_categories | !p_price | !p_unit | !p_size){
                Product.delete_images(locations)
                return res.json(empty_field)
            }

            // ensure that some fields are not too long or short 
            if( p_code.length > 255 || p_name.length > 255) {
                Product.delete_images(locations)
                return res.json({ 
                    succes: false,
                    error: "Name and Code cannot be longer than 255 characters."
                })
            }

            // price must be greater than 0
            if(p_price <= 0){
                Product.delete_images(locations)
                return res.json({ 
                    sucess: false,
                    message: "Price must be greater than 0"
                })
            }

            // p_size must be an array
            if(!Array.isArray(p_size)){
                Product.delete_images(images)
                return res.json({ 
                    error: "The product's size needs to be an array of all possible sizes (e.g. S, M, L or (W x H x D))"
                })
            }

            var found_product = await product_model.findOne({ p_code: p_code })

            if(!found_product){
                Product.delete_images(locations)
                return res.json({ 
                    sucess: false,
                    message: `No product with code ${p_code} was found`
                })
            }

            // ensure that the image links are all part of the original product
            const array_include_test = array.every(val => found_product.p_image_uri.includes(val));

            if(array_include_test == false) {
                return res.json({
                    success: false,
                    message: `Cannot include image_links that are not inside the editied product`
                })
            }


            // unlink images from the array as they are read in 
            if(array.length > 0){
                for(var i = 0; i < found_product.p_image_uri.length; i++){
                    var image = found_product.p_image_uri[i]
                    var found = false

                    // loop through all sent images with the url of the saved images
                    // if found break otherwise delete it from the array
                    for(var j = 0; j<array.length;j++){
                        var s_image = array[j];
                        if(image === s_image){
                            found = true
                            break
                        }
                    }
                    if(found === false){
                        try {
                            delete_object(image)
                        }
                        catch(err) {
                            Product.delete_images(locations)
                            return res.json({
                                succes: false,
                                message: err.message
                            })
                        }
                    }
                }
            }
            else if(found_product.p_image_uri.length > 0){
                for(var i = 0; i < found_product.p_image_uri.length; i++){
                    var image = found_product.p_image_uri[i];
                    try {
                        delete_object(image)
                    }
                    catch(err) {
                        Product.delete_images(locations)
                        return res.json({
                            succes: false,
                            message:  message
                        })
                    }
                }
            }


            for(var i = 0;i < locations.length; i++) {
                array.push(locations[i])
            }

            // init edited price to old price
            var edited_price = {
                success: false,
                p_price_id: found_product.p_price_id,
            };
            var p_price_id = found_product.p_price_id;

            // update price if p_price changes
            if(found_product.p_price !== p_price){
                edited_price = stripe_update_price(p_code, p_price, found_product.p_price_id);

                if(edited_price.success){
                    p_price_id = edited_price.p_price_id;
                }else{
                    Product.delete_images(locations)
                    return res.json(edited_price)
                }
            }

            var edited_product = product_model.findByIdAndUpdate(found_product._id, {
                p_code,
                p_image_uri: array,
                p_name,
                p_price,
                p_price_id,
                p_unit,
                p_size,
                p_categories,
                p_description,
            })
            
            edited_product.exec(err => {
                if(err){
                    Product.delete_images(locations)
                    return res.json({
                        success: false,
                        message: err.message
                    })
                }

                // if success
                return res.json({ 
                    success: true,
                    message: `Product ${p_code} was edited`})
            })



            // need to set up response
            

        }
        catch (err) {
            Product.delete_images(locations)
            return res.json({
                success: false,
                message: err.message
            })
        }
    }

    // @route   POST api/products/delete-product
    // @desc    Delete a product
    // @access  Public 

    // need to somehow make this only accessible by admin user

    async post_delete_product(req,res) {
        try{
            let { p_code } = req.body
            
            // validate input was recieved
            if( !p_code ) {
                return res.json(empty_field)
            }

            //should use findOneAndDelete here -> prevent other commands changing the document
            else {
                var delete_product = await product_model.findOne({ p_code: p_code })
                if(delete_product) {
                    if(delete_product.p_image_uri){
                        Product.delete_images(delete_product.p_image_uri)
                    }
                    product_model.deleteOne({ p_code: p_code }, (err,result) => {
                        if(err){
                            res.json(err)
                        }
                        else {
                            if(result.deletedCount === 1){
                                return res.json({ 
                                    succes: true,
                                    message: `The product with code ${p_code} was deleted` })
                            }
                            else {
                                res.send(result)
                            }
                        }
                    })
                } 
                else {
                    return res.json({ 
                        success: false,
                        message: `Product with code ${p_code} not found, no product was deleted`})
                }
            }
        }
        catch (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }
    }

    // @route   POST api/products/validate-products
    // @desc    Validate if the products have matching info compared to input
    // @access  Public 

    async post_validate_products(req,res) {
        try{
            let { 
                p_codes, p_names, unit_prices,
                price_ids, images, p_sizes
            } = req.body

            // if field is empty
            if(!p_codes || !p_names || !unit_prices 
                || !price_ids || !images || !p_sizes) 
            {
                return res.json(empty_field)
            }

            // p_codes needs to be an array of at least size 1
            if(!Array.isArray(p_codes) || p_codes.length === 0){
                return res.json({
                    success: false,
                    message: "p_codes needs to be an array of at least size 1",
                })
            }

            // find the valid products that contain matching info
            product_model
                .find({
                    'p_code': { $in: p_codes },
                    'p_name': { $in: p_names },
                    'p_price': { $in: unit_prices },
                    'p_price_id': { $in: price_ids },
                    'p_image_uri': { $in: images },
                    'p_size': { $in: p_sizes }
                }, 'p_code') // only return product code
                .then(docs => {
                    

                    return res.json({
                        success: true,
                        valid_pcodes: docs
                    });
                })
                .catch(err => {
                    res.status(404)
                    return res.json({ 
                        success: false,
                        valid_pcodes: [],
                        message: err.message 
                    });
                })
        }
        catch (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }
    }

}

const product_controller = new Product
module.exports = product_controller
