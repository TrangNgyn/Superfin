const categories = require('../models/categories');
const categories_model = require('../models/categories');

var empty_field = { 
    success: false,
    error: "All fields must be filled" 
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
            return res.json({
                success: false,
                error: err.message 
            })
        }
    }

    // @route   POST api/categories/add-category
    // @desc    Add a new category to the category database
    // @acess   Public

    async post_add_category(req,res) {
        try{
            var { c_name, c_description, path } = req.body

            // ensure required fields are present
            if(!c_name | !c_description){
                return res.json(empty_field)
            }

            if(path === "") {
                path = null;
            }

            var new_category = new categories_model({
                c_name,
                c_description,
                path
            })
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
    // @desc    Get all children of the specified root
    // @acess   Public

    async get_all_children(req,res) {
        try{
            var c_name  = req.query.c_name

            var found = await categories_model.find({ c_name })

            if(found) {
                var search = `,${c_name},`
                var children = await categories_model.find({ path: new RegExp(search) })
                res.json({
                    children
                })
            }
            else{
                res.json({
                    success: false,
                    message: `No category found with c_name ${c_name}`
                })
            }

        }
        catch(err) {
            res.json({
                success: false,
                error: err.message
            })
        }
    }
    // @route   GET api/categories/immediate-children
    // @desc    Get immediate children
    // @acess   Public


    async get_immediate_children(req,res) {
        try{
            var c_name  = req.query.c_name

            var found = await categories_model.find({ c_name })

            if(found) {
                var search = `,${c_name},$`
                var children = await categories_model.find({ path: new RegExp(search) })
                res.json({
                    children
                })
            }
            else{
                res.json({
                    success: false,
                    message: `No category found with c_name ${c_name}`
                })
            }

        }
        catch(err) {
            res.json({
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
                var children = await categories_model.find({ path: new RegExp(`,${c_name},`)})
                children.push(delete_category)
                var deleted = [];
                var process = 0;
                children.forEach(element => {
                    element.deleteOne((err,result) => {
                        if(err){
                            return res.json({
                                success: false,
                                message: err.message
                            })
                        }
                        else {
                            process++
                            deleted.push(result)
                        }
                        if(process === children.length) {
                            return res.json({
                                success: true,
                                message: `${c_name} was deleted, as were sub-categories and products`,
                                deleted: deleted
                            })
                        }
                    })
                })
            }
            else{
                res.json({
                    success: false,
                    message: `No category with c_name ${c_name}, no category was deleted`
                })
            }
        }
        catch(err){

        }
    }
}

const categories_controller = new Category
module.exports = categories_controller;