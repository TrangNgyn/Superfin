const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types

const categories_schema = new Schema({
    c_name: {
        type: String,
        required: true
    },
    c_description: {
        type: String
    },
    c_image: {
        type: String
    } 
},
{
    collection: "categories"
})


module.exports = category = mongoose.model("category", categories_schema);