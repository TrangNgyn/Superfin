const { RDS } = require('aws-sdk')
const db = require('../models/db')

var empty_field = { 
    succes: false,
    message: "All fields must be filled and present" 
}

class User {

    // @route GET api/user/

    async get_user_info(req,res) {
        try{

            db.user.findById(req.user_id).select("-password -roles").exec((err,user) => {
                if(err)
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    })
                if(!user) 
                    return res.status(404).json({
                        success: false,
                        message: "User was not found"
                    })
                return res.json(user)    
            })
            
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err.message
            })
        }
    }

    // @route POST api/user/customer

    async post_edit_customer(req,res) {
        try{
            let { first_name, last_name, mobile } = req.body

            if(!first_name | !last_name | !mobile) 
                return res.status(400).json(empty_field)
            
            db.user.findById(req.user_id, (err,user) => {
                if(err) 
                    return res.status(500).json({
                        succes: false,
                        message: err.message
                    })
                if(!user) 
                    return res.status(404).json({
                        succes: false,
                        message: "User was not found"
                    })
                user.first_name = first_name
                user.last_name = last_name
                user.mobile = mobile
                user.save(err => {
                    if(err)
                        return res.status(500).json({
                            succes: false,
                            message: err.message
                        })
                    return res.json({
                        success: true,
                        message: "Customer was updated"
                    })
                })
            })
        } catch(err) {
            console.log(err)
            return res.status(500).json({
                succes: false,
                message: err.message
            })
        }
    }    

    // @route POST api/user/admin

    async post_edit_admin(req,res) {
        try {
            let { acc_name } = req.body

            if(!acc_name) 
                return res.status(400).json(empty_field)

            db.user.findById(req.user_id, (err,user)=> {
                if(err)
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    })
                if(!user)
                    return res.status(404).json({
                        success: false,
                        message: "User was not found"
                    })
                user.acc_name = acc_name
                user.save(err => {
                    if(err)
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        })
                    return res.json({
                        success: true,
                        message: "Admin was updated"
                    })
                })
            })
        } catch(err) {
            console.log(err)
            return res.status(500).json({
                succes: false,
                message: err.message
            })
        }
    }
}