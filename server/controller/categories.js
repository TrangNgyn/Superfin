const categories_model = require('../models/categories');
const fs = require('fs')

var empty_field = { error: "All fields must be filled" }

class Category {

    static delete_images(images) {
        for(i = 0; i < images.length; i++) {
            var file_path = `../public/uploads/categories/${images[i].filename}`
            fs.unlink(file_path, (err) => {
                if(err) {
                    console.log(err)
                    // do we break here? i feel like you should just log the error and continue to try
                    // and delete all of the files associated with the path
                }
            })
        }
    }

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

    // @route   POST api/categories/add-category
    // @desc    Add a new category to the category database
    // @acess   Public

    async post_add_category(req,res) {
        try{
            var { c_name, c_description } = req.body
            var images = req.files

            // validate that all fields are present
            if( !c_name | !c_description) {
                Category.delete_images(images)
                return res.json(empty_field)
            }

            if( c_name > 255) {
                Category.delete_images(images)
                return res.json({ success: false,
                                  message: "Name of category cannot be longer than 255 characters"})
            }

            var all_images = []

            for(const image of images) {
                all_images.push(image.filename)
            }

            const new_category  = new categories_model({
                c_name,
                c_description,
                c_image: all_images

            })

            var saved_category = await new_category.save()
            if(saved_category){
                return res.json({ success: true })
            }
            else {
                return res.json({ sucess: false,
                                  message: "Category was not added" })
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    // @route   POST api/categoires/edit-category
    // @desc    Edit an existing category
    // @access  Public

    async post_edit_category(req,res) {
        try{
            
        }
        catch(err) {
            console.log(err)
        }
    }

}

const categories_controller = new Category
module.exports = categories_controller;