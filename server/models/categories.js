const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const products_model = require('../models/product')

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
    await products_model.deleteMany({p_categories: this._id })
})


module.exports = category = mongoose.model("category", categories_schema);