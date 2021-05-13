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
const { auth_jwt } =  require('../../middleware/auth_middleware')

router.post('/forgot-password', controller.post_forgot_password)
router.post('/reset-password', auth_jwt.verify_token, controller.post_reset_password_request)
router.post('/reset-password-email', controller.post_reset_password_email)

router.get('/', auth_jwt.verify_token, controller.get_user_info)

router.post('/edit-customer', [
    auth_jwt.verify_token,
    auth_jwt.is_customer],
    controller.post_edit_customer)
router.post('/edit-admin', [
    auth_jwt.verify_token, 
    auth_jwt.is_admin], 
    controller.post_edit_admin)

module.exports = router
