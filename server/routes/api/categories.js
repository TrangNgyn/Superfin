const express = require('express');
const router = express.Router();
const categories_controller = require('../../controller/categories')
const {auth_jwt} = require('../../middleware/auth_middleware')

// ADMIN ENDPOINTS //
router.post('/add-category', 
    [auth_jwt.verify_token, auth_jwt.is_admin], 
    categories_controller.post_add_category); // admin
router.delete('/', 
    [auth_jwt.verify_token, auth_jwt.is_admin], 
    categories_controller.delete_category); // admin

// PUBLIC ENDPOINTS //
router.get('/all-categories',categories_controller.get_all_categories) // public
router.get('/all-children', categories_controller.get_all_children); // public
router.get('/children', categories_controller.get_immediate_children); // public 


module.exports = router