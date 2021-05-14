const mongoose = require('mongoose');

const customer_model = require('../models/customer');
const order_model = require('../models/purchased_order');

var empty_field = { error: "All fields must be filled" }
var incorrect_status = { error: "Status must be one of, NEW, SENT, or COMPLETE" }
var stat = ['SHIPPED','COMPLETE','NEW'];

mongoose.set('useFindAndModify', false);



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
        try{
            let { email } = req.body;
            if(!email){
                return res.json(empty_field)
            }
            order_model
                .find({c_email: email})
                .orFail( new Error(`${email} has no orders`))
                .then((order) => {
                    res.json(order)
                })
                .catch(err => {
                    res.json({
                        success: false,
                        message: err.message
                    })
                })
        }
        catch(err) {
            res.json({
                success: false,
                message: err._message
            })
        }
    } 

    // @route   POST api/orders/add-tracking
    // @desc    add tracking number to an existing order
    // @access  Public

    async add_tracking(req, res) {
        try {
            let { po_number, tracking_number, carrier } = req.body;
            let status = "SHIPPED";
            
            if(!po_number | !tracking_number | !carrier ) {
                return res.json(empty_field);
            }

            var found_order = await order_model.findOne({po_number: po_number})

            if(!found_order){
                return res.json({ success: false,
                                  message: `No order with code ${po_number} was found`})
            }

            if(found_order.status === "SHIPPED"){
                return res.json({ success: false,
                                  message: `Order ${po_number} is already SHIPPED`})
            }
            order_model.findByIdAndUpdate(found_order.id, { status, tracking_number, carrier } )
            .exec(err => {
                if(err) {
                    console.log(err)
                    return res.json({ success: false,
                                      error: `${err}`})
                }
                return res.json({ success: true,
                                  message: `Order ${po_number} has had shipping added`})
            })
        }
        catch (err) {
            return res.json({
                success: false,
                message: err._message
            })
        }
    }

    // @route   GET api/orders/all-complete
    // @desc    get all orders that are complete
    // @access  Public 

    async all_complete(req,res) {
        try {
            order_model
                .find({ status: "COMPLETE" })
                .sort({ po_number: 1 })
                .then(order_model => res.json(order_model));

        }
        
        catch(err) {
            return res.json({
                success: false,
                message: err._message
            })
        }
    }

    // @route   GET api/orders/all-uncomplete
    // @desc    get all orders that are not COMPLETE
    // @access  Public

    async all_uncomplete(req,res) {
        try {
            order_model
                .find({ status : { $ne: "COMPLETE"}})
                .sort({ po_number: 1 })
                .then(order_model => res.json(order_model));
        }
        
        catch(err){
            return res.json({
                success: false,
                message: err._message
            })
        }
    }

    // @route   POST api/orders/create-order
    // @desc    create a new order
    // @access  Public

    async create_order(req,res) {
        try {

            let { c_email, status, items, address } = req.body
            
            // check for empty fields
            if( !c_email | !status | !items | !address) {
                return res.json(empty_field)
            }

            // ensuring items has at least one product with the required fields
            if(!Array.isArray(items) || items.length === 0){
                return {
                    success: false,
                    message: "The order must include as least one product"
                }
            }

            items.forEach(element => {
                if(!element.item_code | !element.p_size | !element.quantity | !element.special_requirements){
                    return {
                        success: false,
                        message: "The ordered items must specify the product code, product size, quantity, and special requirements (blank if not applicable)"
                    }
                }
            })

            var issued_date = new Date()

            try {
                const doc = await order_model.create({
                    c_email,
                    issued_date,
                    status,
                    items,
                    address
                })

                return res.json({
                    success:true,
                    message: "Order was added",
                    po_number: doc.po_number
                })
            }
            catch(err) {
                return res.json({
                    success: false,
                    message: "Order was not saved",
                    error: err._message
                })
            }     
        
        }
        catch(err){
            console.log(err)
            return res.json({
                success: false,
                message: err
            })
            
        }
    }

    // @route   POST api/orders/edit-order
    // @desc    edit an existing order
    // @access  Public

    async edit_order(req, res){
        try{
            let { po_number, c_email, status, items, tracking_number, carrier, address} = req.body

            // check for empty fields
            if( !po_number | !c_email | !status | !items | !address) {
                return res.json(empty_field)
            }

            // check if the status is correct
            if(stat.indexOf(status) === -1){
                return res.json(incorrect_status)
            }
            
            // ensuring items has at least one product with the required fields
            if(!Array.isArray(items) || items.length === 0){
                return {
                    success: false,
                    message: "The order must include as least one product"
                }
            }
            items.forEach(element => {
                if(!element.item_code | !element.p_size | !element.quantity | !element.special_requirements){
                    return {
                        success: false,
                        message: "The ordered items must specify the product code, product size, quantity, and special requirements (blank if not applicable)"
                    }
                }
            })

            // update the order
            order_model.findOneAndUpdate({ po_number: po_number }, {
                c_email,
                status,
                items,
                tracking_number,
                carrier,
                address
            })
            .orFail( new Error(`Order ${po_number} not found`))
            .then(() => {
                res.json({  success: true,
                            message: `Order ${po_number} was edited`})
            })
            .catch(error => {
                res.json({ error: error.message })
            })
            
            

        }
        catch(err){
            return res.json({
                success: false,
                message: err._message
            })
        }
    }

    // @route   POST api/orders/delete-order
    // @desc    delete an existing order
    // @access  Public

    async delete_order(req,res){
        try{
            let { po_number } = req.body

            if(!po_number){
                return res.json(empty_field)
            }

            order_model.findOneAndRemove({ po_number: po_number })
            .orFail(new Error(`Order ${po_number} not found`))
            .then(() => {
                res.json({ success: true,
                           message: `Order ${po_number} was deleted`})
            })
            .catch(error => {
                res.json({ success: false,
                           message: error.message })
            })
        }
        catch(err){
            return res.json({
                success: false,
                message: err._message
            })
        }
    }

    // @route   POST api/orders/single-order
    // @desc    get a single order
    // @acces   Public

    async single_order(req,res){
        try{
            let { po_number } = req.body

            if(!po_number){
                return res.json(empty_field)
            }

            var found_order = await order_model.findOne({ po_number: po_number })

            if(!found_order){
                return res.json({ 
                    success: false,
                    message: `There was no order with po_number ${po_number}`})
            }

            return res.json(found_order)
        }
        catch(err){
            return res.json({
                success: false,
                message: err._message
            })
        }
    }
}

module.exports = new Purchased_Order;
