const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const customer_schema = new Schema({
    EmailAddress: {
        type: String,
        required: true
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
        //change back to int32 
        type: String,
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
        // change back to int32
        type: String,
        required: true
        // how do you make it so there is no leading 0??
    }
},
{
    collection: 'customer'
});

module.exports = customer = mongoose.model('customer',customer_schema);

