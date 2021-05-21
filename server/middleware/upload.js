const multer = require('multer')
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new aws.S3();

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'ap-southeast-2'
})

var upload = multer({
    fileFilter: function (req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        }
        else {
            console.log('invalid');
            cb(new Error("Invalid File Type"), false);
        }
    },
    storage: multerS3({
        acl: "public-read",
        s3,
        bucket: process.env.S3_BUCKET,
        key: function(req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix.toString());
        }
    })
})

const any_upload = upload.any()

upload_any = (req,res,next) => {
    any_upload(req,res, function (err) {
      if(err) {
        return res.json({
          success: false,
          message: err.message
        })
      }
      var array = []
      for (var i = 0; i<req.files.length; i++) {
        array.push(req.files[i].location)
      }
      req.images = array
      next()
    }) 
  }
    


const upload_files = {
    upload_any
}

module.exports = upload_files

