const product_model = require('../models/product');
const categories_model = require('../models/categories')
const fs = require('fs');
const path = require('path');
const delete_object = require('../middleware/delete');

var empty_field = { 
    succes: false,
    message: "All fields must be filled and present" }
class Product {

    // delete images referenced by product
    static delete_images(images) {
        for (var i = 0; i < images.length; i++) {
            delete_object(images[i])
        }
    }

    static name_code(p_code, p_name) {
        if( p_code.length > 255 || p_name.length > 255) {
            Product.delete_images(locations)
            return res.json({ 
                succes: false,
                error: "Name and Code cannot be longer than 255 characters."
            })
        }
    }

    static valid_price(p_price) {
        if(p_price <= 0){
            Product.delete_images(locations)
            return res.json({ 
                sucess: false,
                message: "Price must be greater than 0"
            })
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


    // need to add category to this - and implement categories across the database

    async post_add_product(req,res,images) {
        try {

            var { p_code, p_name, p_price, p_units_sold, p_categories, p_description } =  req.body  

            if(images.length <= 0) {
                Product.delete_images(images)
                return res.json({
                    succes: false,
                    message: "At least one image needs to be included"
                })
            }
            
            // validate that input was recieved
            if( !p_code | !p_name | !p_categories | !p_price){
                Product.delete_images(images)
                return res.json(empty_field)
            }

            // validate that name and code
            if( p_code.length > 255 || p_name.length > 255 || p_description > 511) {
                Product.delete_images(images)
                return res.json({ error: "Name and Code cannot be longer than 255 characters and description cannot be larger than 511 "})
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
                p_units_sold,
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
            return res.json({
                success: false,
                message: err.message
            })
        }
    }

    // @route   POST api/products/edit-product
    // @desc    edit an existing product
    // @access  Public

    async post_edit_product(req, res, locations) {
        try {

            var { p_code, p_name, p_price, p_units_sold, p_image_uri, p_categories, p_description } = req.body

            var images = req.files

            if(typeof p_image_uri === 'undefined') {
                return res.json(empty_field)
            }

            if(images.length <= 0 && p_image_uri.length == 0) {
                return res.json({ 
                    success: false,
                    message: `An image must be present in the edited product`
                })
            }

            // move the images into the images array for adding the locations of new images
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
            if( !p_code | !p_name | !p_categories | !p_price ){
                Product.delete_images(locations)
                return res.json(empty_field)
            }

            // ensure that some fields are not too long or short 
            name_code(p_code, p_name)

            // price must be greater than 0
            valid_price(p_price)

            var found_product = await product_model.findOne({ p_code: p_code })

            if(!found_product){
                Product.delete_images(locations)
                return res.json({ 
                    sucess: false,
                    message: `No product with code ${p_code} was found`
                })
            }

            // unlink images from the array as they are read in 
            if(p_image_uri != 0){
                for(var i = 0; i < found_product.p_image_uri.length; i++){
                    var image = found_product.p_image_uri[i];
                    var found = false;

                    // loop through all sent images with the url of the saved images
                    // if found break otherwise delete it from the array
                    for(var s_image in p_image_uri){
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
                            delete_object(locations)
                            return res.json({
                                succes: false,
                                message: err.message
                            })
                        }
                    }
                }
            }
            else if(found_product.p_image_uri.length != 0){
                for(var i = 0; i < found_product.p_image_uri.length; i++){
                    var image = found_product.p_image_uri[i];
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


            p_image_uri += locations;

            var edited_product = product_model.findByIdAndUpdate(found_product._id, {
                p_code,
                p_image_uri,
                p_name,
                p_price,
                p_units_sold,
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
                        Product.delete_images(delete_product.p_image_uri);
                    }
                    product_model.deleteOne({ p_code: p_code }, (err,result) => {
                        if(err){
                            res.send(err)
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
                    });
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

    // @route   POST api/products/product-sold
    // @desc    Increase the products sold count
    // @access  Public

    async post_product_sold(req,res) {
        try{
            var { p_code, count } = req.body

            // find the code and matching product
            var found_product = await product_model.findOne({ p_code: p_code })

            if(!found_product){
                res.status(404)
                return res.json({ success: false,
                                  message: "No product was found" })
            }

            var updated_product = product_model.findByIdAndUpdate(found_product._id,{
                p_units_sold: Number(count) + found_product.p_units_sold
            })
            updated_product.exec(err => {
                if(err)
                    console.log(err)
                return res.json({ success: true,
                                  message: `Product ${1111} sales has been updated` })
            })
            // how do i ensure concistency?!
            // need to update this if there is something more i need to do 
            
        }
        catch(err){
            return res.json({
                success: false,
                message: err.message
            })
        }
    }
}

const product_controller = new Product
module.exports = product_controller;