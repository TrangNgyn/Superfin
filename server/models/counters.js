const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counter_schema = new Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
},
{
    collection: 'counters',
    versionKey: false
});

module.exports = counters = mongoose.model('counters', counter_schema);