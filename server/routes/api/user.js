// const express = require('express');
// const router = express.Router();
// const customer_controller = require('../../controller/customers');

// router.get('/all-customers', customer_controller.get_all_customers);
// router.post('/customer-by-email', customer_controller.post_customer_by_email);
// router.post('/edit-customer',customer_controller.post_edit_user_info);

// // ====== Authentication ====== //
// router.post('/auth/register', customer_controller.post_register);
// router.post('/auth/sign-in', customer_controller.post_sign_in);
// router.route('/auth/forgot-password')
//     .get(customer_controller.render_forgot_password_template)
//     .post(customer_controller.post_forgot_password);
// router.route('/auth/reset-password')
//     .get(customer_controller.render_reset_password_template)
//     .post(customer_controller.post_reset_password);

// module.exports = router;

// get user info -> user based done
// forgot password -> user based
// reset password -> user based
// edit customer -> user based  done
    // name, mobile
    // needs admin and customer version


const express = require('express')
const router = express.Router();
const controller = require('../../controller/user');



module.exports = router
