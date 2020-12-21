const mongoose = require('mongoose');

const customer_model = require('../models/customer');
const order_model = require('../models/purchased_order');

var empty_field = { error: "All fields must be filled" }

class Purchased_Order {
    
    // @route   GET api/orders/all-orders
    // @desc    Get all orders, sort by the order number
    // @access  Public

    async get_all_orders(req,res) {
        try{            
            order_model
                .find()
                .sort({ po_number: 1 })
                .then(order_model => res.json(order_model));

        }catch(err) {
            console.log(err)
        }
    }

    
    // @route   POST api/orders/order-by-email
    // @desc    Get all orders of a customer through their email
    // @access  Public

    async post_order_by_email(req, res) {
        // Using fetch
        let {email} = req.body;
        if(!email){
            return res.json(empty_field)
        }
        order_model
            .find({CustomerEmail: email})
            .exec()
            .then((order) => {
                if (!order) {
                    res.status(404)
                    return res.json({success: false})
                }
                return res.json(order)
            })
            .catch(err => res.json(err))
    } 

    // @route   POST api/orders/add-tracking
    // @desc    add tracking number to an existing order
    // @access  Public

    async add_tracking(req, res) {
        try {
            let { po_number, tracking_number, carrier } = req.body;
            console.log(po_number)
            if(!po_number | !tracking_number | !carrier ) {
                return res.json(empty_field);
            }
            else {
                order_model
                    .findOneAndUpdate({PONumber: po_number}, 
                                    { TrackingNumber: tracking_number, Carrier: carrier })
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
}

module.exports = new Purchased_Order;