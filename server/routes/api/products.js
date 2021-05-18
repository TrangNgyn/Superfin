const express = require('express');
const router = express.Router();
const product_controller = require('../../controller/products')
const upload = require('../../middleware/upload');
const { auth_jwt } = require("../../middleware/auth_middleware");


// product viewing routes
router.get('/all-product', product_controller.get_all_products); // public
router.post('/product-by-id',product_controller.post_product_by_id); // public
router.post('/product-by-category', product_controller.post_product_by_category); // public 
router.post('/product-by-category-price',product_controller.post_product_by_category_price); // public

// product management routes
router.post('/add-product', 
  [auth_jwt.verify_token, auth_jwt.is_admin, upload.upload_any],
  product_controller.post_add_product);  // admin
router.post('/delete-product', 
  [auth_jwt.verify_token, auth_jwt.is_admin],
  product_controller.post_delete_product); // admin
router.post('/edit-product', 
  [auth_jwt.verify_token, auth_jwt.is_admin, upload.upload_any],
  product_controller.post_edit_product); // admin

module.exports = router