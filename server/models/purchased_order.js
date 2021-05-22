const mongoose = require('mongoose');
const counters = require('./counters');
const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// create schema
const order_schema = new Schema({
    po_number:{
        type: String,
        index:{
			unique:true,
		}
    },
    c_email: {
        type: String,
        required: true,
        index:{
			unique:true,
		},
		validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    issued_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    items: {    // array of items, incl. item_code, quantity and special requriements for each
        type: [{
            item_code: {
                type: String,
                required: true
            },
            p_size: { // the chosen size of the product
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true
            },
            special_requirements: {
                type: String,
                default: ""
            }
        }],
        default: [],   
    },
    tracking_number: {
        type: String,
        default: ""
    },
    carrier: {
        type: String,
        default: ""
    },
    address: {
        type: {
            po_attention_to: {
                type: String,
                required: true
            },
            po_address_line1: {
                type: String,
                required: true
            },
            po_address_line2: {
                type: String,
                default: "",
            },
            po_suburb: {
                type: String,
                required: true
            },
            po_state: {
                type: String,
                required: true
            },
            po_postcode: {
                type: String,
                required: true
            },
            po_country: {
                type: String,
                default: "Australia"
            }
        },
        default: {}
    }
},
{
    collection: 'purchased_order',
    versionKey: false

});

// pre save hook to assign a incremental id to the order
order_schema.pre("save", function(next) {
    var doc = this;
    counters.findByIdAndUpdate(
        {"_id": "order_id"},
        { "$inc": { "seq": 1 }},
        function(error, counters) {
            if(error) 
                return error
            doc.po_number = counters.seq.toString();
            next();
        }
    )
})

module.exports = purchased_order = mongoose.model('purchased_order',order_schema);

