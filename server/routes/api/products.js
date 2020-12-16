const express = require('express');
const router = express.Router();
const product_controller = require('../../controller/products')


router.get('/all-product', product_controller.get_all_products);
router.post('/add-product', product_controller.post_add_product);
router.post('/delete-product', product_controller.post_delete_product);

module.exports = router

