const express = require('express');
const router = express.Router();
const order_controller = require('../../controller/orders');

router.get('/all-orders', order_controller.get_all_orders);
router.post('/order-by-email', order_controller.post_order_by_email);
router.post('/add-tracking', order_controller.add_tracking);

module.exports = router;