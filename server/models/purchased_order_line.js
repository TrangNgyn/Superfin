const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// create schema
const order_line_schema = new Schema({
    po_number:{
        type: String,
        required: true
    },
    item_code: {
        type: String,
        required: true
    },
    requested_quantity: {
        type: Number,
        required: true
    },
    special_requirements: {
        type: String
    }
},
{
    collection: 'purchased_order_line'
});

module.exports = purchased_order_line = mongoose.model('purchased_order_line',order_line_schema);

