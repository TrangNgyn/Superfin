const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const productSchema = new Schema({
    _id : {
        type: String,
        required: true
    },
    p_item_name: {
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
    p_catagories: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "categories"
    },
    // p_image_uri: {
    //     type: array
    // }
},
{
    collection: 'product'
});

module.exports = product = mongoose.model('product', productSchema);