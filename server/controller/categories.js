const categories_model = require('../models/categories');

class Category {

    // @route   GET api/categories/all-categories
    // @desc    Get all categories
    // @access  Public

    async get_all_categories(req,res) {
        try{
            var categories = await categories_model.find({})
            if(categories) {
                return res.json({ categories })
            }
        }
        catch(err) {
            console.log(err)
        }
    }

}

const categories_controller = new Category
module.exports = categories_controller;