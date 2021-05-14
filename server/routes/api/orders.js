const express = require('express');
const router = express.Router();
const order_controller = require('../../controller/orders');
const { auth_jwt } = require("../../middleware/auth_middleware");
const auth = require('./auth');


router.get('/all-orders',
    [auth_jwt.verify_token,auth_jwt.is_admin], 
    order_controller.get_all_orders); // amdin
router.post('/order-by-email', 
    [auth_jwt.verify_token,auth_jwt.is_admin], 
    order_controller.post_order_by_email);  // admin

router.get('/orders-for-user') // need user based order collection

router.post('/add-tracking',
    [auth_jwt.verify_token,auth_jwt.is_admin],
    order_controller.add_tracking); //admin
router.get('/all-complete', 
    [auth_jwt.verify_token, auth_jwt.is_admin],
    order_controller.all_complete); // admin
router.get('/all-uncomplete', 
    [auth_jwt.verify_token, auth_jwt.is_admin],
    order_controller.all_uncomplete); // admin
router.post('/delete-order',
    [auth_jwt.verify_token, auth_jwt.is_admin],
    order_controller.delete_order); // admin 
router.post('/single-order', 
    [auth_jwt.verify_token, auth_jwt.is_admin],
    order_controller.single_order);  // admin

router.post('/single-order-for-user', 
    [auth_jwt.verify_token, auth_jwt.is_customer],
    ) // need user based single order

router.post('/create-order',order_controller.create_order); // public
router.post('/edit-order', 
    [auth_jwt.verify_token, auth_jwt.is_admin],
    order_controller.edit_order); // admin

module.exports = router;