const express = require('express');
const router = express.Router();
const product_controller = require('../../controller/products')
const upload = require('../../middleware/upload');

// product viewing routes
router.get('/all-product', product_controller.get_all_products);
router.post('/product-by-id',product_controller.post_product_by_id);
router.post('/product-by-category', product_controller.post_product_by_category);
router.post('/product-by-category-price',product_controller.post_product_by_category_price);

// product management routes
router.post('/add-product', 
  upload.any(),
  // function(req,res) {
  //   if(res.fileValidationError){ 
  //     return res.json({
  //       success: false,
  //       message: "No File or Invalid File Type"
  //     });
  //   }
  // },
  product_controller.post_add_product
);
router.post('/delete-product', product_controller.post_delete_product);
router.post('/edit-product', upload.any(), product_controller.post_edit_product);
router.post('/product-sold',product_controller.post_product_sold);

module.exports = router

