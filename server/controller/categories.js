const categories = require('../models/categories');
const categories_model = require('../models/categories');

var empty_field = { 
    success: false,
    error: "All fields must be filled" 
}


async function defulat_search(req,value){
    try{
        var c_name = req.c_name
        if(!c_name){
            throw (empty_field)
        }
        var found_parent = await categories_model.findOne({c_name})

        if(found_parent){
            switch(value){
                case 0:
                    return found_parent.getAllChildren({},"c_name");
                case 1:
                    return found_parent.getImmediateChildren({},"c_name");
                case 2:
                    return found_parent.getAncestors({},"c_name");
            } 
        }
        else{
            throw {
                succes: false,
                message: `No parent found with name ${c_name}`
            }
        }
    }
    catch(err){
        throw {
            success:false,
            message: err.message
        }
    }
}

class Category {

    // @route   GET api/categories/all-categories
    // @desc    Get all categories
    // @access  Public

    async get_all_categories(req,res) {
        try{
            categories_model.find({},function (err,result) {
                if(!err)
                    res.json(result)
            })
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
            var { c_name, c_description, parent } = req.body

            // validate that all fields are present
            if( !c_name | !c_description) {
                return res.json(empty_field)
            }

            var new_category;

            if(parent) {                
                var found_parent = await categories_model.findOne({ c_name: parent })
                    
                if(!found_parent){
                    return res.json({
                        success: false,
                        message: `No parent found with c_name ${parent}`
                    })
                }
                new_category = new categories_model({
                    c_name, 
                    c_description,
                    parent: found_parent
                })
                
            }   
            else {
                new_category = new categories_model({
                    c_name,
                    c_description
                })
            }
            
            new_category.save((err) => {
                if(err) {
                    return res.json({
                        success: false,
                        message: err.message
                    })
                }
                return res.json({
                    success: true,
                    message: `Category with name ${c_name} was added`
                })
            })
                
        }
        catch(err) {
            return res.json({
                success: false,
                error: err.message 
            })
        }
    }

    // @route   GET api/categories/all-children
    // @desc    Get all children of specifed category
    // @acess   Public

    async all_children(req,res) {
        try{
            res.json(await defulat_search(req.query,0))
        }
        catch(err){
            return res.json({
                success: false,
                error: err.message 
            })
        }  
    }

    // @route   GET api/categories/children
    // @desc    Get immediate children of specified category
    // @acess   Public

    async immed_children(req,res) {
        try{
            res.json(await defulat_search(req.query,1))
        }
        catch(err){
            return res.json({
                success: false,
                error: err.message 
            })
        }  
    }

    // @route   GET api/categories/ancestors
    // @desc    Get all ancestors of specified category
    // @acess   Public

    async get_ancestors(req,res) {
        try{
            res.json(await defulat_search(req.query,2))
        }
        catch(err){
            return res.json({
                success: false,
                error: err.message 
            })
        }  
    }

    // @route   DEL api/categories/delete
    // @desc    Delete a category
    // @acess   Public

    async delete_category(req,res) {
        try{
            var c_name = req.query.c_name

            if(!c_name){
                res.json(empty_field)
            }

            var delete_category = await categories_model.findOne({c_name})

            if(delete_category){
                categories_model.deleteOne({c_name}, (err, result) => {
                    if(err)
                        res.json({
                            succes: false,
                            error: err.message
                        })
                    else {
                        if(result.deletedCount===1){
                            return res.json({
                                success: true,
                                message: `The category with c_name ${c_name} was delted`
                            })
                        }
                        else {
                            res.json(result)
                        }
                    }
                })
            }
            else {
                return res.json({
                    success: false,
                    message: `No category with c_name ${c_name} was found, no category deleted`
                })
            }

        }
        catch(err){
            return res.json({
                success: false,
                error: err.message
            })
        }
    }

    async children_tree(req,res) {

        categories_model.findOne({c_name: req.query.c_name})
            .then(categories_model => categories_model.getChildrenTree({}))
            .then(categories_model => res.json(categories_model))
    }


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

}

const categories_controller = new Category
module.exports = categories_controller;