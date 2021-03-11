const express = require('express');
const router = express.Router();
const order_controller = require('../../controller/orders');

router.get('/all-orders', order_controller.get_all_orders);
router.post('/order-by-email', order_controller.post_order_by_email);
router.post('/add-tracking', order_controller.add_tracking);
router.get('/all-complete', order_controller.all_complete);
router.get('/all-uncomplete', order_controller.all_uncomplete);
router.post('/add-tracking',order_controller.add_tracking);
router.post('/delete-order',order_controller.delete_order);
router.post('/single-order',order_controller.single_order);
router.post('/create-order',order_controller.create_order);
router.post('/edit-order',order_controller.edit_order);

module.exports = router;