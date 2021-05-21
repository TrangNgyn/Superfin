const express = require('express');
const router = express.Router();
const order_controller = require('../../controller/orders');
const { auth_jwt } = require("../../middleware/auth_middleware");
const auth = require('./auth');

// PUBLIC ORDER ROUTES //
router.post('/create-order',order_controller.create_order); 

// ADMIN ORDER ROUTES // 
router.get('/all-orders',
    [auth_jwt.verify_token,auth_jwt.is_admin], 
    order_controller.get_all_orders); 
router.get('/all-complete', 
    [auth_jwt.verify_token, auth_jwt.is_admin],
    order_controller.all_complete); 
router.get('/all-uncomplete', 
    [auth_jwt.verify_token, auth_jwt.is_admin],
    order_controller.all_uncomplete); 
router.post('/order-by-email', 
    [auth_jwt.verify_token,auth_jwt.is_admin], 
    order_controller.post_order_by_email);  
router.post('/add-tracking',
    [auth_jwt.verify_token,auth_jwt.is_admin],
    order_controller.add_tracking); 
router.post('/delete-order',
    [auth_jwt.verify_token, auth_jwt.is_admin],
    order_controller.delete_order); 
router.post('/single-order', 
    [auth_jwt.verify_token, auth_jwt.is_admin],
    order_controller.single_order);  

// CUSTOMER ORDER ROUTES //
router.get('/orders-for-user',
    [auth_jwt.verify_token, auth_jwt.is_customer],
    order_controller.get_customer_orders) 
router.post('/single-order-for-user', 
    [auth_jwt.verify_token, auth_jwt.is_customer],
    order_controller.get_single_order_customer) 
router.post('/edit-order', 
    [auth_jwt.verify_token, auth_jwt.is_admin],
    order_controller.edit_order); 

module.exports = router;