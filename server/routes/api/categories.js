const express = require('express');
const router = express.Router();
const categories_controller = require('../../controller/categories')

router.post('/add-category', categories_controller.post_add_category);

router.get('/all-categories',categories_controller.get_all_categories)
router.get('/all-children', categories_controller.get_all_children);
router.get('/children', categories_controller.get_immediate_children);

router.delete('/',categories_controller.delete_category);

module.exports = router