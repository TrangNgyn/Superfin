const express = require('express');
const router = express.Router();
const categories_controller = require('../../controller/categories')

router.get('/all-categories',categories_controller.get_all_categories)

module.exports = router