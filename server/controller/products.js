const product_model = require('../models/product');
const fs = require('fs');

var empty_field = { error: "All fields must be filled" }
class Product {

    // delete images referenced by product
    static delete_images(images) {
        for (var i = 0; i < images.length; i++) {
            var file_path = `../public/uploads/products/${images[i].filename}`
            fs.unlink(file_path, (err) => {
                if(err) { 
                    console.log(err)
                    // do we break here? i feel like you should just log the error and continue to try
                    // and delete all of the files associated with the path
                }
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
            console.log(err)
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
                    res.status(404)
                    return res.json({ success: false })
                }
            }
        }
        catch (err) {
            console.log(err)
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
                if(categories)
                    return res.json({ Categories: categories })
                else { 
                    res.status(404)
                    return res.json({ success: false })
                }
            }
        }
        catch (err) {
            console.log(err);
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
                var categories = await product_model.find({ p_catagories: cat_id }).sort({ p_price: 1 })
                if(categories){
                    return res.json(categories)
                }
                else {
                    res.status(404)
                    return res.json({ success: false })
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    // @route   GET api/products/product-by-price
    // @desc    Get products sorted by price
    // @access  Public  

    async get_product_by_price(req,res) {
        try {
            var products = await product_model.find({}).sort({ p_price: 1 })
            if(products) {
                return res.json(products)
            }
            else {
                return res.json({ success: false })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    // @route   POST api/products/add-product
    // @desc    Create a product
    // @access  Public


    // need to add category to this - and implement categories across the database

    async post_add_product(req,res) {
        try {
            
            var { p_code, p_name, p_price, p_units_sold, p_catagories, p_image_uri, p_description } =  req.body

            var images = req.files

            // validate that input was recieved
            if( !p_code | !p_name | !p_catagories | !p_price ){
                Product.delete_images(images)
                return res.json(empty_field)
            }
            // validate that name and code
            else if( p_code.length > 255 || p_name.length > 255 || p_desciption > 511) {
                Product.delete_images(images)
                return res.json({ error: "Name and Code cannot be longer than 255 characters and description cannot be larger than 511 "})
            }
            else {
            
            // need too clean input here potentially to ensure that product addition is not corrupting the database

                var all_images = []

                for (const image of images) {
                    all_images.push(image.filename)
                }

                const new_product = new product_model({
                    p_image_uri: all_images,
                    p_code,
                    p_name,
                    p_price,
                    p_units_sold,
                    p_catagories,
                    p_description
                })

                var saved_product = await new_product.save()
                if (saved_product) {
                    return res.json({ success: true })
                }
                else {
                    return res.json({ success: false })
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    // @route   POST api/products/edit-product
    // @desc    edit an existing product
    // @access  Public

    async post_edit_product(req, res) {
        try {

            let { _id, ItemCode, ItemName } = req.body

            if(!ItemCode | !ItemName ) {
                return res.json(empty_field);
            }
            else if(ItemCode > 225 | ItemName > 225) {
                return res.json({ error: "Name and Code cannot be longer than 255 characters"})
            }
            else {
                product_model
                    .findByIdAndUpdate(_id, { ItemCode, ItemName }, { useFindAndModify: false })
                    .exec(err => {
                        if(err)
                            console.log(err)
                        return res.json({ success: true })
                    })
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    // @route   POST api/products/delete-product
    // @desc    Delete a product
    // @access  Public 

    // need to somehow make this only accessible by admin user

    async post_delete_product(req,res) {
        try{
            let { id } = req.body
            
            // validate input was recieved
            if( !id ) {
                return res.json(empty_field)
            }

            //could use findOneAndDelete here
            else {
                var delete_product = await product_model.findById(id)
                if(delete_product) {
                    Product.delete_images(delete_product.p_image_uri);
                    product_model.deleteOne(delete_product);
                    return res.json({ success: true });
                } 
                else {
                    return res.json( { success: false })
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}

const product_controller = new Product
module.exports = product_controller;