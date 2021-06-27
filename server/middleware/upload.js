const multer = require('multer')
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new aws.S3();

// set the configurateion fileds from the env variables 
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'ap-southeast-2'
})

// create function to handle uploads using the multer package
var upload = multer({
    // set a file filter to only accept jpegs and pngs
    fileFilter: function (req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        }
        else {
            console.log('invalid');
            cb(new Error("Invalid File Type"), false);
        }
    },
    // set the storage as an s3 bucket based on the .env variables 
    storage: multerS3({
        acl: "public-read",
        s3,
        bucket: process.env.S3_BUCKET,
        key: function(req, file, cb) {
            // generate a random suffix for the new products in the s3 bucket
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix.toString());
        }
    })
})

// called the upload any method of the multer func
const any_upload = upload.any()

// allow for any amount of files to be uploaded 
upload_any = (req,res,next) => {
    any_upload(req,res, function (err) {
      if(err) {
        return res.json({
          success: false,
          message: err.message
        })
      }
      var array = []
      // push the locations (urls) of the uploaded files to an array
      for (var i = 0; i<req.files.length; i++) {
        array.push(req.files[i].location)
      }
      // return the images to the req body to be accessed in following functions and middleware
      req.images = array
      next()
    }) 
  }
    


const upload_files = {
    upload_any
}

module.exports = upload_files

