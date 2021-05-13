const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express'),
    bodyParser = require('body-parser'),
    db = require('./models/db')

// Imported routers

const product = require('./routes/api/products');
const categories = require('./routes/api/categories');
const user = require('./routes/api/user');
const order = require('./routes/api/orders');
const about = require('./routes/api/aboutus');

const app = express();

function initial() {
    db.role.estimatedDocumentCount((err, count)=> {
      if(!err && count === 0) {  
        for(let i = 0; i < db.ROLES.length; i++){
          new role({
            name: db.ROLES[i].toLowerCase()
          }).save(err => {
            if(err) {
              console.log("error", err)
            }
            console.log(`added ${db.ROLES[i]} to roles collection`)
          })
        }
      }
    })
  }

// bodyparser middleware
app.use(bodyParser.json());

// connect to mongo
db.mongoose
    .connect(process.env.mongoURI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB connected...')
        initial();
    })
    .catch(err => console.log(err));



// allow Cross origin 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "x-access-token Origin, X-Requested-With, Content-Type, Accept");
    next(); 
});

// Routes
app.use('/api/products', product)
// app.use('/api/categories', categories);
// app.use('/api/customers', customer);
// app.use('/api/orders', order);
// app.use('/api/aboutus', about);
app.use('/api/user', user)

require('./routes/api/auth')(app)


// Run Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})