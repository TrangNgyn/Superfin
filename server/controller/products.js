const product_model = require('../models/product');

var empty_field = { error: "All fields must be filled" }
class Product {
    
    // @route   GET api/products/all-product
    // @desc    Get all itmes
    // @access  Public

    async get_all_products(req,res) {
        try{
            product_model
                .find()
                .sort({ ItemName: 1 })
                .then(product_model => res.json(product_model))
        }
        catch(err) {
            console.log(err)
        }
    }

    // @route   POST api/products/product-by-code
    // @desc    Get all items sorted by code
    // @access  Public

    async post_product_by_id(req, res) {
        try{
            let { id } = req.body
            if(!id){
                return res.json(empty_field)
            }
            else {
                product_model
                    .findById(id)
                    .then(product_model => res.json(product_model))
                    // this should be cleaned up into if statements that catch if the product was not found
                    // instead of a catch all error that potentially wont be correct
                    .catch(() => res
                                    .status(404)
                                    .json({ failure: `Product with id: ${id} was not found`}))
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
            let { cat } = req.body
            if(!cat) {
                return res.json(empty_field)
            }
            else {
                product_model
                    .find( { Category: cat })
                    .then(product_model => res.json(product_model))
                    // this should be cleaned up into if statements that catch if the product was not found
                    // instead of a catch all error that potentially wont be correct
                    .catch(() => res
                                    .status(404)
                                    .json({ failure: `Product with id: ${id} was not found`}))
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    // @route   POST api/products/add-product
    // @desc    Create a product
    // @access  Public


    // need to add category to this - and implement categories across the database

    async post_add_product(req,res) {
        try {
            var ItemCode = req.body['*ItemCode'];
            var ItemName = req.body.ItemName;

            // validate that input was recieved
            if( !ItemName | !ItemCode ){
                return res.json(empty_field)
            }
            // validate that name and code
            else if( ItemName.length > 225 || ItemCode.length > 225 ) {
                return res.json({ error: "Name and Code cannot be longer than 255 characters"})
            }
            else {
            
            // need too clean input here potentially to ensure that product addition is not corrupting the database

              const new_product = new product_model({
                ItemName: req.body.ItemName,
                ItemCode: req.body.ItemCode
            });
            new_product
                .save()
                .then(() => res.json({ success: true}))  
                .catch(() => res.json({ success: false}))
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

            // need to change the database from using *ItemCode to use ItemCode 
            // or find a way to allow for the use of *ItemCode that can be read into the js

            let { _id, ItemCode: ItemCode, ItemName } = req.body

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

            else{
                product_model
                    .findById(id)
                    .then(product_controller => product_controller
                                                    .remove()
                                                    .then(() => res.json({ success: `Product with id: ${id} was removed`})))
                    .catch(() => res
                                    .status(404)
                                    .json({ failure: `Product with id: ${id} was not found`}))
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}

const product_controller = new Product
module.exports = product_controller;