const multer = require('multer')
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new aws.S3();

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'ap-southeast-2'
})

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix);
    }
  })

var upload = multer({
    fileFilter: function (req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        }
        else {
            console.log('invlid');
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

module.exports = upload

