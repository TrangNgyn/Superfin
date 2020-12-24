const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const customer_model = require('../models/customer');

var empty_field = { error: "All fields must be filled" }

class Customer {
    
    // @route   GET api/customers/all-customers
    // @desc    Get all customers
    // @access  Public

    async get_all_customers(req,res) {
        try{            
            // DO NOT DELETE -- For future reference
            // role_model.findOne({name: 'customer_role'}, {_id: 1}, function(err, docs){
            //     // Get the id of the customer_role document
            //     var c_id = docs._id;

            //     // Get the users who are customers
            //     customer_model
            //         .find({Role: new ObjectId(c_id)})
            //         .sort({ EmailAddress: 1 })
            //         .then(customer_model => res.json(customer_model));
            // }) 
            customer_model
                .find()
                .sort({ email: 1 })
                .then(customer_model => res.json(customer_model));

        }catch(err) {
            console.log(err)
        }
    }

    // @route   POST api/customers/customer-by-email
    // @desc    Get all customers sorted by email
    // @access  Public

    async post_customer_by_email(req, res) {
        // Using fetch
        let {email} = req.body;
        // Get the users with matched email
        customer_model
            .find({email: email})
            .exec()
            .then((user) => {
                if (!user) {
                    res.status(404)
                    return res.json({success: false})
                }
                return res.json(user)
            })
            .catch(err => res.json(err))
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
    */

    // @route   POST api/products/edit-product
    // @desc    edit an existing product
    // @access  Public

    async post_edit_user_info(req, res) {
        try {

            let { email, first_name, last_name, mobile_number,
                po_attention_to, po_address_line1, po_address_line2,
                po_suburb, po_state, po_postal_code, po_country } = req.body;
            
            if(req.body.constructor === Object && Object.keys(req.body).length === 0 ) {
                return res.json(empty_field);
            }
            else if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                return res.json({ error: "Input email is not valid"})
            } // checks for suburb, state, country and mobile number
            else {
                customer_model.findOne({email: email}, {_id: 1}, function(err, docs){
                    // Get the id of the customer_role document
                    var c_id = docs._id;
                    
                    // Get the users who are customers
                    customer_model.findByIdAndUpdate(c_id, 
                        { email, first_name, last_name, mobile_number,
                            po_attention_to, po_address_line1, po_address_line2,
                            po_suburb, po_state, po_postal_code, po_country } , 
                        {new: true, useFindAndModify: false})
                    .exec()
                    .then((customer) => {
                        if (!customer) {
                            res.status(404) // no document found
                            return res.json({success: false})
                        }
                        return res.json(customer)
                    })
                    .catch(err => res.json(err))
                }) 
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    /*
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