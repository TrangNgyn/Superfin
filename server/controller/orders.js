const mongoose = require('mongoose');

const customer_model = require('../models/customer');
const order_model = require('../models/purchased_order');

var empty_field = { error: "All fields must be filled" }

class Purchased_Order {
    
    // @route   GET api/customers/all-customers
    // @desc    Get all customers
    // @access  Public

    async get_all_orders(req,res) {
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
            order_model
                .find()
                .sort({ c_email: 1 })
                .then(order_model => res.json(order_model));

        }catch(err) {
            console.log(err)
        }
    }

    /*
    // @route   POST api/customers/customer-by-email
    // @desc    Get all customers sorted by email
    // @access  Public

    async post_customer_by_email(req, res) {
        // Using fetch
        let {email} = req.body;
        // Get the users with matched email
        customer_model
            .find({EmailAddress: email})
            .then(customer_model => res.json(customer_model))
            .catch(err=> res.json(err))
    }
*/
  

    
}

module.exports = new Purchased_Order;