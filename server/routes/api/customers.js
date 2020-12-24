const express = require('express');
const router = express.Router();
const customer_controller = require('../../controller/customers');

router.get('/all-customers', customer_controller.get_all_customers);
router.post('/customer-by-email', customer_controller.post_customer_by_email);
router.post('/edit-customer',customer_controller.post_edit_user_info);

module.exports = router;