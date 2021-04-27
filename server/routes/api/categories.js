const express = require('express');
const router = express.Router();
const categories_controller = require('../../controller/categories')

router.post('/add-category', categories_controller.post_add_category);

router.get('/all-categories',categories_controller.get_all_categories)
router.get('/all-children', categories_controller.all_children);
router.get('/children', categories_controller.immed_children);
router.get('/ancestors', categories_controller.get_ancestors);
router.get('/childrenTree',categories_controller.children_tree);

router.delete('/',categories_controller.delete_category);



module.exports = router