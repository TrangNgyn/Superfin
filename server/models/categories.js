const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categories_schema = new Schema({
    c_Name: {
        type: String,
        required: true
    },
    c_description: {
        type: string
    },
    c_image: {
        type: String
    } 
},
{
    collection: categories
})


module.exports = category = mongoose.model('category', categories_schema);