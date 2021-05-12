const jwt = require('jsonwebtoken'),
    config = require('../config/auth_config'),
    db = require('../models/db')

verify_token = (req,res,next) => {
    let token = req.headers['x-access-token'];

    if(!token) 
        return res.status(403).send({
            success: false,
            message: "No token provided"
        })
    
    jwt.verify(token,config.secret,(err,decoded) => {
        if(err)
            return res.status(401).send({
                success: false,
                message: "Unauthorized"
            })
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