const db = require('../models/db')
const crypto = require('crypto')
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const email = process.env.MAILER_EMAIL_ID
const pass = process.env.MAILER_PASSWORD
const path = require('path');
const bcrypt = require('bcrypt')

const passwordRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'

var empty_field = { 
    succes: false,
    message: "All fields must be filled and present" 
}

var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: email,
        pass: pass
    }
})

var salt_rounds = 12

var handlebarsOptions =  {
    viewEngine: {
        partialsDir: path.resolve('./', 'views/partials'),
        layoutsDir: path.resolve('./', 'views/layouts')
    },
    extName: '.html',
    viewPath: path.resolve('./', 'views')
}

smtpTransport.use('compile', hbs(handlebarsOptions))

class User {

    // @route   GET api/user/
    // @desc    get the user info for the specified user
    // @access  restricted to signed in users

    async get_user_info(req,res) {
        try{

            db.user.findById(req.user_id).select("-password -roles -reset_password_token -reset_password_expires -__t -_id -__v").exec((err,user) => {
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

    // @route   POST api/user/edit-customer
    // @desc    edit customer information (not password)
    // @access  Restricted to signed in customers

    async post_edit_customer(req,res) {
        try{
            let { first_name, last_name, mobile } = req.body

            if(!first_name | !last_name | !mobile) 
                return res.status(400).json(empty_field)
            
            db.customer.findById(req.user_id, (err,user) => {
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

    // @route   POST api/user/edit-admin
    // @desc    edit admin information (not password)
    // @access  Restricted to signed in admins

    async post_edit_admin(req,res) {
        try {
            let { acc_name } = req.body

            if(!acc_name) 
                return res.status(400).json(empty_field)

            db.admin.findById(req.user_id, (err,user)=> {
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

    // @route   POST api/user/forgot-password
    // @desc    
    // @access  Restricted to signed in customers

    async post_forgot_password(req,res) {
        try{
            db.user.findOne({ email: req.body.email }, (err,user) => {
                if(err)
                    return res.status(500).send({
                        success: false,
                        message: err.message
                    })
                if(!user) 
                    return res.status(404).send({
                        succes: false,
                        message: "No user found with that email"
                    })
                crypto.randomBytes(32, (err, buffer) => {
                    if(err)
                        return res.status(500).send({
                            success: false,
                            message: err.message
                        })
                    var myDate = new Date()
                    user.reset_password_token = buffer.toString('hex');
                    user.reset_password_expires = new Date(myDate.getTime() + 86400000)
                    user.save(err => {
                        if(err)
                            return res.status(500).send({
                                succes: false,
                                message: err.message
                            })
                        var data = {
                            to: user.email,
                            from: email,
                            template: 'forgot-password-email',
                            subject: 'Request to Reset Password',
                            context: {
                                // this needs to be the FE address so that they can use the token and email in the 
                                // password reset request
                                url: 'http://www.superfinpkg.com.au/user/reset-password-email/token/'+ buffer.toString('hex') + '/email/' + user.email,
                                name: user.first_name,
                                token: buffer.toString('hex')
                            }
                        }
            
                        smtpTransport.sendMail(data, err => {
                            if(err)
                                return res.status(500).send({
                                    success: false,
                                    message: err.message
                                })
                            return res.json({
                                success: true,
                                message: "Kindly check your email for further instructions"
                            })
                        })
                    })
                })            
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                succes: false,
                message: err.message
            })
        }
    }

    // @route   POST api/user/reset-password-email
    // @desc    User has recieved a 
    // @access  Restricted to signed in customers

    async post_reset_password_email(req,res) {
        try{
            if(!req.body.new_password | !req.body.email | !req.body.token) 
                    return res.status(400).send(empty_field)
            db.user.findOne({ email: req.body.email }, async (err, user) => {
                if(err)
                    return res.status(500).send({
                        success: false,
                        message: err.message
                    })
                if(!user) 
                    return res.status(404).send({
                        success: false,
                        message: `User with email: ${req.body.email} was not found`
                    })
                if(user.reset_password_token == null | user.reset_password_expires == null)
                    return res.status(403).send({
                        success: false,
                        message: "Password reset has not been requested"
                    })
                if(user.reset_password_token !== req.body.token) 
                    return res.status(401).send({
                        success: false,
                        message: "Unauthorized"
                    })
                if(user.reset_password_expires < Date.now())
                    return res.status(400).send({
                        success: false,
                        message: "Token has expired"
                    })
                const found = req.body.new_password.match(passwordRegex)
                if(found == null)
                    return res.status(400).send({
                        success: false,
                        message: "Password does not meet the criteria"
                    })
                
                var new_password_compare = await bcrypt.compare(req.body.new_password, user.password)
                if(new_password_compare)
                    return res.status(400).send({
                        success: false,
                        message: "New password cannot be the same as the old password"
                    })
                user.password = bcrypt.hashSync(req.body.new_password, salt_rounds)
                user.reset_password_expires = null
                user.reset_password_token = null
                user.save((err,user) => {
                    if(err)
                        return res.status(500).send({
                            success: false,
                            message: err.message
                        })
                    var data = {
                        to: user.email,
                        from: email,
                        template: 'reset-password-confirmation-email',
                        subject: 'Password Reset Confirmation',
                        context: {
                            name: user.first_name
                        }
                    }

                    smtpTransport.sendMail(data,err => {
                        if(err)
                            return res.status(500).send({
                                success: false,
                                message: err.message
                            })
                        else 
                            return res.send({
                                success: true,
                                message: "Password has been reset, check your email for confirmation"
                            })
                    })
                })
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                succes: false,
                message: err.message
            })
        }
    }

    async post_reset_password_request(req,res) {
        try{
            if(!req.body.new_password | !req.body.verify_password) 
                    return res.status(400).send(empty_field)
            db.user.findById(req.user_id, async (err,user) => {
                if(err)
                    return res.status(500).send({
                        success: false,
                        message: err.message
                    })
                if(!user) 
                    return res.status(404).send({
                        success: false,
                        message: "User was not found"
                    })
                const found = req.body.new_password.match(passwordRegex)
                if(found == null)
                    return res.status(400).send({
                        success: false,
                        message: "Password does not meet the criteria"
                    })
                
                var verify_compare = await bcrypt.compare(req.body.verify_password, user.password)
                
                if(!verify_compare) 
                    return res.status(403).send({
                        success: false,
                        message: "Verify password was incorrect"
                    })
                else {
                    var new_password_compare = await bcrypt.compare(req.body.new_password, user.password)
                    if(new_password_compare)
                        return res.status(400).send({
                            success: false,
                            message: "New password cannot be the same as the old password"
                        })
                }
                user.password = await bcrypt.hash(req.body.new_password, salt_rounds)
                await user.save((err) => {
                    if(err)
                        return res.status(500).send({
                            success: false,
                            message: err.message
                        })
                    return res.send({
                        success: true,
                        message: "Password was updated"
                    })
                })    
                
            })
            
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                succes: false,
                message: err.message
            })
        }
    }
}

const user = new User()
module.exports = user