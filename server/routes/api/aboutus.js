const express = require('express');
const router = express.Router();
const about_controller = require('../../controller/aboutus')
const { auth_jwt } = require('../../middleware/auth_middleware')
const db = require('../../models/db')

// get and post endpoints for the company info
router.get('/', about_controller.get_company_info) 
router.post('/edit-info',
    [auth_jwt.verify_token, auth_jwt.is_admin],
    about_controller.post_edit_company_info)

module.exports = router
