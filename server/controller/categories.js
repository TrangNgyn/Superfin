const categories = require('../models/categories');
const categories_model = require('../models/categories');
const db = require('../models/db')

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
            // find all categories
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

            // if no path set path to null
            if(path === "") {
                path = null;
            }

            const found =  req.body.c_name.match(db.categoryRegex)
            if(found == null)
                return res.status(400).send({
                    success: false,
                    message: "Category names can only be alphanumeric"
                })

            // create new category
            var new_category = new categories_model({
                c_name,
                c_description,
                path
            })

            // save new category
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
                // do a regex search on the path's of all categories
                var children = await categories_model.find({ path: new RegExp(search) })
                // return the found categories
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
                // do a regex search for all categories that are immediate children of the provided 
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

            // find a category
            var delete_category = await categories_model.findOne({c_name})

            if(delete_category){
                // find all categoriges that are children of the specified category
                var children = await categories_model.find({ path: new RegExp(`,${c_name},`)})
                // add the found category to the children array
                children.push(delete_category)
                var deleted = [];
                var process = 0;
                // delete each category
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