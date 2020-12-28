const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const productSchema = new Schema({
    p_code : {
        type: String,
        required: true
    },
    p_name: {
        type: String,
        required: true
    },
    p_price: {
        type: Number,
        required: true
    },
    p_units_sold: {
        type: Number,
        default: 0
    },
    p_categories: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'categories'
    },
    p_image_uri: {
        type: [String]
    },
    x   : {
        type: String
    }
},
{
    collection: 'products'
});

module.exports = product = mongoose.model("products", productSchema);