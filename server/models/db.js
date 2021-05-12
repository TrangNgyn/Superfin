const mongoose = require('mongoose')

const db = {}

db.mongoose = mongoose

db.role = require('./role')
db.user = require('./user')
db.customer = require('./customer')
db.admin = require('./admin')

db.ROLES = ["user", "customer", "admin"]

module.exports = db