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
    PO_attention_to: {
        type: String,
        required: true
    },
    PO_address_line1: {
        type: String,
        required: true
    },
    PO_address_line2: {
        type: String,
        required: true
    },
    PO_suburb: {
        type: String,
        required: true
    },
    PO_state: {
        type: String,
        required: true
    },
    PO_postal_code: {
        type: Number,
        required: true
    },
    PO_country: {
        type: String,
        required: true
    },
    country_code: {
        type: String,
        required: true,
        default: '+61'
    },
    mobile_number: {
        type: Number,
        required: true
        // how do you make it so there is no leading 0?? 
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

