const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {stripe_add_product, stripe_deactivate_product} = require('../middleware/stripe_util');

// function to validate the unit quantity
var validateProductUnit = function(unit) {
    var re = /^\d+?\s\w+?\/\w+$/;
    return re.test(unit)
};

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
    p_unit: { // unit per item (e.g. 100 bags per item)
        type: String,
        required: true,
        validate: [validateProductUnit, 
            'Please fill a valid unit quantity (e.g. 10 bags/box)'],
        match: [/^\d+?\s\w+?\/\w+$/,
            'Please fill a valid unit quantity (e.g. 10 bags/box)'],
        trim: true
    },
    p_size: { // Small, Medium, Large or (W x H x D)
        type: [String],
        default: [],
        required: true,
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
        return new Error(stripe_product.message)
    else{
        doc.p_price_id = stripe_product.price_id
        next(); 
    }
})

productSchema.post("remove", async function(next){
    var doc = this
    var stripe_product = await stripe_deactivate_product(doc.p_code, doc.p_price_id);
    if(!stripe_product.success)
        return next(new Error(stripe_product.message))
    else{
        next(); 
    }
})

module.exports = product = mongoose.model("products", productSchema)