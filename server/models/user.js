const mongoose = require('mongoose')
const Schema = mongoose.Schema

const base_options = {
    discriminator_key: 'user_type',
    collection: 'users'
}

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
    ]
}, base_options)

module.exports = user = mongoose.model('user', user_schema)