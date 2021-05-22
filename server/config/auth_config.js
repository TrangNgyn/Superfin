const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// return the secret for the auth generation
module.exports = {
    secret: process.env.SECRET
}