const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MpathPlugin = require('mongoose-mpath/lib/mpath')

const categories_schema = new Schema({
    c_name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    c_description: {
        type: String
    }
},
{
    collection: "categories",
    versionKey: false
})


categories_schema.plugin(MpathPlugin);

module.exports = category = mongoose.model("category", categories_schema);