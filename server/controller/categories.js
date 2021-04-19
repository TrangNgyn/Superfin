const categories_model = require('../models/categories');
const fs = require('fs');

var empty_field = { error: "All fields must be filled" }

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

    // leave all of this commented out until we decide if we are going to only have prefixed categories

    // @route   POST api/categories/add-category
    // @desc    Add a new category to the category database
    // @acess   Public

//     async post_add_category(req,res) {
//         try{
//             var { c_name, c_description } = req.body
//             var images = req.files

//             // validate that all fields are present
//             if( !c_name | !c_description) {
//                 Category.delete_images(images)
//                 return res.json(empty_field)
//             }

//             if( c_name > 255) {
//                 Category.delete_images(images)
//                 return res.json({ success: false,
//                                   message: "Name of category cannot be longer than 255 characters"})
//             }

//             var all_images = []

//             for(const image of images) {
//                 all_images.push(image.filename)
//             }

//             const new_category  = new categories_model({
//                 c_name,
//                 c_description,
//                 c_image: all_images

//             })

//             var saved_category = await new_category.save()
//             if(saved_category){
//                 return res.json({ success: true })
//             }
//             else {
//                 return res.json({ sucess: false,
//                                   message: "Category was not added" })
//             }
//         }
//         catch(err) {
//             console.log(err)
//         }
//     }

//     // @route   POST api/categoires/edit-category
//     // @desc    Edit an existing category
//     // @access  Public

//     async post_edit_category(req,res) {
//         try{
//             // load data from the req body into variables
//             var { c_name, c_description, c_image } = req.body

//             // load the images from the files
//             var images = req.files

//             // check that the input was recieved
//             if(!c_name | !c_description) {
//                 return res.json({ success: false,
//                                   message: empty_field })
//             }

//             // ensure that c_name and c_description are no longer than 255 characters
//             if(c_name > 255 | c_description > 255) {
//                 return res.json({ success: false,
//                                   message: "c_name and c_description cannot be longer than 255 characters"})
//             }

//             // find the category that is being edited
//             var category = await categories_model.findOne({ c_name: c_name })

//             // if there is  no found category then return error 
//             if(!category) {
//                 res.status(404)
//                 return res.json({ success: false,
//                                   message: "No category found"})
//             }

//             // if the length of the submitted string is 0 remove all images from the category
//             if(c_image.length === 0) {
//                 Category.delete_images(category.c_image)
//             }

//             // check each of the 

//         }
//         catch(err) {
//             console.log(err)
//         }
//     }

//     async post_delete_category(req,res) {
//         try {
//             var { id } = req.body

//             // validate that input that was recieved 
//             if( !id ) {
//                 return res.json({ success: false,
//                                   message: empty_field })
//             }
            
//             var delete_category = await categories_model.findById(id)
//             if(delete_product) {
//                 Category.delete_images(delete_product.c_image)
//                 categories_model.deleteOne(delete_category)
//                 return res.json({ success: true,
//                                   message: "Category Deleted"})
//             }
//         }
//         catch(err) {
//             console.log(err)
//         }
//     }

}

const categories_controller = new Category
module.exports = categories_controller;