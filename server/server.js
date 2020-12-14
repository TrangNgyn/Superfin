const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Imported routers
//
const product = require('./routes/api/products');

const app = express();

// bodyparser middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongo
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
app.use('/api/products', product);

// Run Server
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})