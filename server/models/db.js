const mongoose = require('mongoose')

const db = {}

db.mongoose = mongoose

// contain all models in one file for easy access
db.role = require('./role')
db.user = require('./user')
db.customer = require('./customer')
db.admin = require('./admin')
db.order = require('./purchased_order')
db.counters = require('./counters')

// consistent information required accross multiple apis
db.ROLES = ["customer", "admin"]
db.COUNTERS = ["order_id"]
db.passwordRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
db.categoryRegex = '^[A-Za-z0-9\s]+$'

module.exports = db