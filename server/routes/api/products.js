const express = require('express');
const router = express.Router();
const product_controller = require('../../controller/products')


router.get('/all-product', product_controller.get_all_products);
router.post('/single-product',product_controller.post_product_by_id);
router.post('/product-by-category', product_controller.post_product_by_category);

router.post('/add-product', product_controller.post_add_product);
router.post('/delete-product', product_controller.post_delete_product);
router.post('/edit-product', product_controller.post_edit_product);


// add information for image stoarage and ability to call images from the front end

module.exports = router

