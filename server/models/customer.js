const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// create schema
const customer_schema = new Schema({
    email: {
        type: String,
        required: true,
        index:{
			unique:true,
		},
		validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    po_attention_to: {
        type: String,
        required: true
    },
    po_address_line1: {
        type: String,
        required: true
    },
    po_address_line2: {
        type: String,
        required: true
    },
    po_suburb: {
        type: String,
        required: true
    },
    po_state: {
        type: String,
        required: true
    },
    po_postal_code: {
        type: Number,
        required: true
    },
    po_country: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        index:{
			unique:true,
		},
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    }
    
},
{
    collection: 'customer'
});

module.exports = customer = mongoose.model('customer',customer_schema);

