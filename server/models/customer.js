const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// create schema
const customer_schema = new Schema({
    EmailAddress: {
        type: String,
        required: true,
        index:{
			unique:true,
		},
		validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    POAttentionTo: {
        type: String,
        required: true
    },
    POAddressLine1: {
        type: String,
        required: true
    },
    POAddressLine2: {
        type: String,
        required: true
    },
    POSuburb: {
        type: String,
        required: true
    },
    POState: {
        type: String,
        required: true
    },
    POPostalCode: {
        type: Number,
        required: true
    },
    POCountry: {
        type: String,
        required: true
    },
    CountryCode: {
        type: String,
        required: true,
        default: '+61'
    },
    MobileNumber: {
        type: Number,
        required: true
        // how do you make it so there is no leading 0?? 
    },
    Role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    }
    
},
{
    collection: 'customer'
});

module.exports = customer = mongoose.model('customer',customer_schema);

