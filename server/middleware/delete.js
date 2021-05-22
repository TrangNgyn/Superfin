const aws = require('aws-sdk');

const s3 = new aws.S3();

// method to get the end of a url
const getLast = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

// delet object in the s3 bucket, get the object id from the url
function delete_object(image) {
    image2 = getLast(image)
    s3.deleteObject({ Key: image2, Bucket: process.env.S3_BUCKET }, function(err, data) {
        if(err)
            console.log(err)
    })
}

module.exports = delete_object;