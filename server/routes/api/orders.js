const express = require('express');
const router = express.Router();
const customer_controller = require('../../controller/orders');

router.get('/all-orders', customer_controller.get_all_orders);
//router.post('/customer-by-email', customer_controller.post_customer_by_email);

module.exports = router;