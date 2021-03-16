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

const app = express();

// bodyparser middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongo
mongoose
    .connect(db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
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
app.use('/api/aboutus', about)

const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');
const { response } = require('express');

const s3 = new AWS.S3();

const upload_file = (buffer, name, type) => {
    const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: require('./config/keys').S3_BUCKET,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`,
    };
    return s3.upload(params).promise();
};

app.post('/test-upload', (request, response) => {
    const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
        if(error) {
            return response.status(500).send(error)
        };
        try {
            const path = files.file[0].path;
            const buffer = fs.readFileSync(path);
            const type = await fileType.fromBuffer(buffer);
            const fileName = `bucketFolder/${Date.now().toString()}`;
            const data = await upload_file(buffer, fileName, type);
            return response.status(200).send(data);
        }
        catch(err) {
            return response.status(500).send(err);
        }
    })
})

// Run Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})