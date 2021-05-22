const mongoose = require('mongoose')
const Schema = mongoose.Schema

// set base schema options so taht admin and customer can inherit the common fields
const base_options = {
    discriminator_key: 'user_type',
    collection: 'users'
}

// user schema
const user_schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'role'
        }
    ],
    reset_password_token: {
        type: String,
        default: null
    },
    reset_password_expires: {
        type: Date,
        default: null
    }

}, base_options)

module.exports = user = mongoose.model('user', user_schema)