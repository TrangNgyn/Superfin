const express = require('express');
const router = express.Router();
const product_controller = require('../../controller/products')
const upload = require('../../middleware/upload');
const anyUpload = upload.any();

// product viewing routes
router.get('/all-product', product_controller.get_all_products);
router.post('/product-by-id',product_controller.post_product_by_id);
router.post('/product-by-category', product_controller.post_product_by_category);
router.post('/product-by-category-price',product_controller.post_product_by_category_price);

// product management routes
router.post('/add-product', function(req,res) {
  anyUpload(req,res, function (err) {
    if(err) {
      return res.json({
        success: false,
        message: err.message
      })
    }
    var array = []
    for (var i = 0; i<req.files.length; i++) {
      array.push(req.files[i].location)
    }
    product_controller.post_add_product(req,res,array)
  })
});
router.post('/delete-product', product_controller.post_delete_product);
router.post('/edit-product', function(req,res) {
  anyUpload(req, res, function(err) {
    if(err) {
      return res.json({
        success: false,
        message: err.message
      })
    }
    var array = []
      for (var i = 0; i<req.files.length; i++) {
        array.push(req.files[i].location)
      }
    product_controller.post_edit_product(req,res,array);
  })
});
// router.post('/product-sold',product_controller.post_product_sold);

module.exports = router

