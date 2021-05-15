const express = require('express')
const router = express.Router();
const controller = require('../../controller/user');
const { auth_jwt } =  require('../../middleware/auth_middleware')

router.post('/forgot-password', controller.post_forgot_password)
router.post('/change-password', auth_jwt.verify_token, controller.post_reset_password_request)
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
