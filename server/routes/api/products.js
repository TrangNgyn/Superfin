const express = require('express');
const router = express.Router();
const product_controller = require('../../controller/products')
const multer = require('multer')

// example used in the multer readme to handle disk storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/products')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '_' + uniqueSuffix)
    }
  })
  
  var upload = multer({ storage: storage })

// product viewing routes
router.get('/all-product', product_controller.get_all_products);
router.post('/product-by-id',product_controller.post_product_by_id);
router.post('/product-by-category', product_controller.post_product_by_category);
router.post('/product-by-category-price',product_controller.post_product_by_category_price);

// product management routes
router.post('/add-product', upload.any(), product_controller.post_add_product);
router.post('/delete-product', product_controller.post_delete_product);
router.post('/edit-product', upload.any(), product_controller.post_edit_product);
router.post('/product-sold',product_controller.post_product_sold);


// add information for image stoarage and ability to call images from the front end

module.exports = router

