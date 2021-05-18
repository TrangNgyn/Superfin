const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user')

const customer_schema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    }
})

const customer = user.discriminator('customer', customer_schema)

module.exports = mongoose.model('customer')
