const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const express = require('express'),
    db = require('./models/db'),
    cors = require('cors'),
    mongoSanitize = require('express-mongo-sanitize');

// Imported routers
const product = require('./routes/api/products')
const categories = require('./routes/api/categories')
const user = require('./routes/api/user')
const order = require('./routes/api/orders')
const about = require('./routes/api/aboutus')
const stripe = require('./routes/api/stripe')

// declare the express app
const app = express();

// function to initialize necessary information in the db 
function initial() {
    // ensure that all the role docs are inserted
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
    // ensure that all counters are inserted
    db.counters.estimatedDocumentCount((err,count) => {
      if(!err && count===0) {
        for(let i = 0; i < db.COUNTERS.length; i++) {
          new db.counters({
            _id: db.COUNTERS[i].toLowerCase()
          }).save(err => {
            if(err) 
              console.log("error", err)
            console.log(`added ${db.COUNTERS[i]} to the counters collection`)
          })
        }
      }
    })
  }

// bodyparser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




// connect to mongo
db.mongoose
    .connect(process.env.mongoURI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB connected...')
        initial();
    })
    .catch(err => console.log(err))

// set up cors
app.use(cors())
// Sanitize against NoSQL query injections
app.use(mongoSanitize())

// static build files if in prod
if(process.env.NODE_ENV == 'production') {
  app.use(express.static('../client/ReactProject/build'))
}

// Routes
app.use('/api/products', product)
app.use('/api/categories', categories)
app.use('/api/orders', order)
app.use('/api/aboutus', about)
app.use('/api/stripe', stripe)
app.use('/api/user', user)
// need to change this routing 
require('./routes/api/auth')(app)

if(process.env.NODE_ENV == 'production'){
  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/ReactProject/build','index.html'))
  })
}


// Run Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})