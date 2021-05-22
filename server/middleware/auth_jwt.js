const { ComputeOptimizer } = require('aws-sdk')
const jwt = require('jsonwebtoken'),
    config = require('../config/auth_config'),
    db = require('../models/db')


// method to verify any sent tokens for controlling access to endpoints
verify_token = (req,res,next) => {
    let auth_header = req.headers.authorization
    let token

    // if no header don't give away what is required and send a bare auth header
    if(!auth_header){
        res.setHeader("WWW-Authenticate","Bearer")
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    // split the header to just get the token
    else
        token = auth_header.split(' ')[1]
    // verify the token with the secret
    jwt.verify(token,config.secret,(err,decoded) => {
        if(err) {
            // return different error messages and status' based on the type of error
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
        // set the req.user_id to the id that was contianed inside the token to be used
        // in other middleware and methods
        req.user_id =  decoded._id
        next()
    })
}

// function to confirm that the signed in user is an admin
is_admin = (req,res,next) => {
    // find user by the req.user_id
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
        // find roles based on the roles in the found user's array
        db.role.find({
            _id: {$in: user.roles }
        },(err, roles) => {
            if(err)
                return res.status(500).send({
                    success: false,
                    message: err
                })
            // if role is admin return out of func
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "admin"){
                    return next()
                }
            }
            // if role is not admin return error in the auth header and a res body
            res.setHeader("WWW-Authenticate","Bearer realm='is_admin',error='insufficient_scope',error_description='Access token not valid for this resource'")
            res.status(403).send({
                success: false,
                message: "Require Admin Role, unauthorized"
            })
        })
    })
}

// same as admin func but instead checks you are a customer instead 
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