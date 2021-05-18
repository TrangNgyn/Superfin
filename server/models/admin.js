const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user')

const admin_schema = new Schema({
    acc_name: {
        type: String,
        required: true
    }
})

const admin = user.discriminator('admin', admin_schema)

module.exports = mongoose.model('admin')