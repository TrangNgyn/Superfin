const express = require('express');
const router = express.Router();

//Product Model
const product = require('../../models/product');

// @route   GET api/products
// @desc    Get all itmes
// @access  Public

router.get('/', (req,res) => {
    product
        .find()
        .sort({ ItemCode: 1})
        .then(product => res.json(product))
});

// @route   POST api/products
// @desc    Create a product
// @access  Public

router.post('/', (req,res) => {
    const newProduct = new product({
        ItemName: req.body.ItemName,
        ItemCode: req.body.ItemCode
    });

    newProduct
        .save()
        .then(product => res.json(product))
});

// @route   DEL api/products
// @desc    Delete a product
// @access  Public 

router.delete('/:id', (req,res) => {
    product
        .findById(req.params.id)
        .then(product => product.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

module.exports = router