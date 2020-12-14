const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const productSchema = new Schema({
    ItemCode : {
        type: String,
        require: true
    },
    ItemName: {
        type: String,
        require: true
    }
},
{
    collection: 'product'
});

module.exports = product = mongoose.model('product', productSchema);