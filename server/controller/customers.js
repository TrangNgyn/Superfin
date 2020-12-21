const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const customer_model = require('../models/customer');
const role_model = require('../models/role');
const checkDuplicatedEmail = require('../middleware/verify-email');

var empty_field = { error: "All fields must be filled" }

class Customer {
    
    // @route   GET api/customers/all-customers
    // @desc    Get all customers
    // @access  Public

    async get_all_customers(req,res) {
        try{            
            role_model.findOne({name: 'customer_role'}, {_id: 1}, function(err, docs){
                // Get the id of the customer_role document
                var c_id = docs._id;

                // Get the users who are customers
                customer_model
                    .find({Role: new ObjectId(c_id)})
                    .sort({ EmailAddress: 1 })
                    .then(customer_model => res.json(customer_model));
            }) 

        }catch(err) {
            console.log(err)
        }
    }

    // @route   POST api/customers/customer-by-email
    // @desc    Get all customers sorted by email
    // @access  Public

    async post_customer_by_email(req, res) {
        try{
            let { email } = req.body
            if(!email){
                return res.json(empty_field)
            }
            else {
                if(checkDuplicatedEmail){
                    customer_model
                        .findById(email)
                        .then(customer_model => res.json(customer_model))
                }else{
                    return res.json({ error: `Email ${email} does not exist.`});
                }
                
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    /*
    // @route   POST api/customers/add-customer
    // @desc    Create a customer account
    // @access  Public

    async post_add_customer(req,res) {
        try {
            var EmailAddress = req.body.EmailAddress;
            var FirstName = req.body.FirstName;
            var LastName = req.body.LastName;
            var POAttentionTo = req.body.POAttentionTo;
            var POAddressLine1 = req.body.POAddressLine1;
            var POAddressLine2 = req.body.POAddressLine2;
            var POSuburb = req.body.POSuburb;
            var POState = req.body.POState;
            var POPostalCode = req.body.POPostalCode;
            var POCountry = req.body.POCountry;
            var POCountryCode = req.body.POCountryCode;
            var MobileNumber = req.body.MobileNumber;

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
    */

    
}

module.exports = new Customer;