const aws = require('aws-sdk');

const s3 = new aws.S3();

const getLast = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

function delete_object(image) {
    image2 = getLast(image)
    s3.deleteObject({ Key: image2, Bucket: require('../config/keys').S3_BUCKET }, function(err, data) {
        if(err)
            console.log(err)
    })
}

module.exports = delete_object;