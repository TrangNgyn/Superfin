const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const products_model = require('../models/product')

// categories schema
const categories_schema = new Schema({
    c_name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    c_description: {
        type: String
    },
    path: {
        type: String,
        default: null,
        index: true
    }
},
{
    collection: "categories",
    versionKey: false
})


categories_schema.pre('deleteOne', {document:true, query:false}, async function() {
    // hacky fix - > will refactor if have time (Ollie)
    // deletes all products that are associated with teh category making sure to call
    // the deleteOne pre hook - as the deleteMany was not calling the pre hook
    var children_products = await products_model.find({p_categories: this._id})
    children_products.forEach(element => {
        element.deleteOne((err) => {
            if(err)
                return new Error(err)
        })
    })


})


module.exports = category = mongoose.model("category", categories_schema);