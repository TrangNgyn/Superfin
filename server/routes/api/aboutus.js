const express = require('express');
const router = express.Router();
const about_controller = require('../../controller/aboutus')

router.get('/', about_controller.get_company_info)
router.post('/edit-info', about_controller.post_edit_company_info)

module.exports = router