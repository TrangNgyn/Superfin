const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const productSchema = new Schema({
    ItemCode : {
        type: String,
        required: true
    },
    ItemName: {
        type: String,
        required: true
    },
    Category: {
        type: String
    }
},
{
    collection: 'product'
});

module.exports = product = mongoose.model('product', productSchema);