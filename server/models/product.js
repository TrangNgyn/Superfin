const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {stripe_add_product} = require('../middleware/stripe_util');

//Create schema
const productSchema = new Schema({
    p_code : {
        type: String,
        required: true
    },
    p_name: {
        type: String,
        required: true
    },
    p_price: {
        type: Number,
        required: true
    },
    p_price_id: {
        type: String,
        default: "",
    },
    p_units_sold: {
        type: Number,
        default: 0
    },
    p_categories: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'categories'
    },
    p_image_uri: {
        type: [String]
    },
    p_description: {
        type: String,
        default: ""
    }
},
{
    collection: 'products',
    versionKey: false

});

productSchema.pre("save", async function(next) {
    var doc = this
    var stripe_product = await stripe_add_product(doc.p_code, doc.p_name, doc.p_price);
    if(!stripe_product.success)
        return next(new Error(stripe_product.message))
    else{
        doc.p_price_id = stripe_product.price_id
        next(); 
    }
    
})

module.exports = product = mongoose.model("products", productSchema)