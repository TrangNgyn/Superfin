const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// There are two types of roles, including "customer_role" and "admin_role"
const role_schema = new Schema({
  name : {
    type: String,
    required: true,
    index:{
			unique:true,
    }
  },
  privileges : {
    type: [String]
  }
},
{
  collection: 'roles',
  versionKey: false
});

module.exports = role = mongoose.model('roles',role_schema);