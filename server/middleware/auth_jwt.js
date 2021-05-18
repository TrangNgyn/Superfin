const { ComputeOptimizer } = require('aws-sdk')
const jwt = require('jsonwebtoken'),
    config = require('../config/auth_config'),
    db = require('../models/db')

verify_token = (req,res,next) => {
    let auth_header = req.headers.authorization
    let token

    // need to send back the different header
    if(!auth_header){
        res.setHeader("WWW-Authenticate","Bearer")
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    else
        token = auth_header.split(' ')[1]
    jwt.verify(token,config.secret,(err,decoded) => {
        if(err) {
            res.status(401)
            if(err.message=="jwt expired") {
                res.setHeader("WWW-Authenticate","Bearer error='invalid_token',error_description='The access token has expired'")
                return res.send({
                    success: false,
                    message: "Unauthorized"
                })
            }
            if(err.message=='invalid token'){
                res.setHeader("WWW-Authenticate","Bearer error='invalid_token',error_description='The access token failed verification'")
                return res.send({
                    success: false,
                    message: "Unauthorized"
                })
            }
            res.setHeader("WWW-Authenticate","Bearer error='invalid_token',error_description='Unexpected validation error'")
            return res.send({
                success: false,
                message: "Unauthorized"
            })
                
        }
        req.user_id =  decoded._id
        next()
    })
}

is_admin = (req,res,next) => {
    db.user.findById(req.user_id).exec((err,user) => {
        if(err)
            return res.status(500).send({
                success: false,
                message: err
            })
        if(!user) 
            return res.status(404).send({
                success: false,
                message: "No user found"
            })
        db.role.find({
            _id: {$in: user.roles }
        },(err, roles) => {
            if(err)
                return res.status(500).send({
                    success: false,
                    message: err
                })
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "admin"){
                    return next()
                }
            }
            res.setHeader("WWW-Authenticate","Bearer realm='is_admin',error='insufficient_scope',error_description='Access token not valid for this resource'")
            res.status(403).send({
                success: false,
                message: "Require Admin Role, unauthorized"
            })
        })
    })
}

is_customer = (req,res,next) => {
    db.user.findById(req.user_id).exec((err,user) => {
        if(err)
            return res.status(500).send({
                success: false,
                message: err
            })
        db.role.find({
            _id: { $in: user.roles }
            
        }, (err,roles) => {
            if(err) {
                console.log(err)
                return res.status(500).sedn({
                    success: false,
                    message:err
                })
            }
            for(let i = 0; i< roles.length; i++) {
                if(roles[i].name === "customer") {
                    return next()
                }
            }
            res.setHeader("WWW-Authenticate","Bearer realm='is_customer',error='insufficient_scope',error_description='Access token not valid for this resource'")
            res.status(403).send({
                success: false,
                message: "Require Customer Role, unauthorized"
            })
        })
    })
}

const auth_jwt = {
    verify_token,
    is_admin,
    is_customer
}

module.exports =  auth_jwt