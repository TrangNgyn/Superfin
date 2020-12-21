const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// create schema
const order_schema = new Schema({
    po_number:{
        type: String,
        required: true,
        index:{
			unique:true,
		}
    },
    c_email: {
        type: String,
        required: true,
        index:{
			unique:true,
		},
		validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    issued_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    tracking_number: {
        type: String
    },
    carrier: {
        type: String
    }
},
{
    collection: 'purchased_order'
});

module.exports = purchased_order = mongoose.model('purchased_order',order_schema);

