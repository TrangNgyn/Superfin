const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Imported routers
//
const product = require('./routes/api/products');
const categories = require('./routes/api/categories');
const customer = require('./routes/api/customers');
const order = require('./routes/api/orders');
const about = require('./routes/api/aboutus');
const stripe = require('./routes/api/stripe');

const app = express();

// bodyparser middleware
app.use(bodyParser.json());

// connect to mongo
mongoose
    .connect(process.env.mongoURI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// allow Cross origin 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); 
});

// Routes
app.use('/api/products', product);
app.use('/api/categories', categories);
app.use('/api/customers', customer);
app.use('/api/orders', order);
app.use('/api/aboutus', about);
app.use('/api/stripe', stripe);


// Run Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})