const db = require('../models/db')
const crypto = require('crypto')
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const email = process.env.MAILER_EMAIL_ID
const pass = process.env.MAILER_PASSWORD
const path = require('path');
const bcrypt = require('bcrypt')


var empty_field = { 
    success: false,
    message: "All fields must be filled and present" 
}

var domain = 'http://localhost:3000'
if(process.env.NODE_ENV ==  'production')
    domain = 'http://54.252.17.165'

// set the trasnport object information
var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: email,
        pass: pass
    }
})

// rounds of salt for encryption
var salt_rounds = 12

// set engine for generating html emails
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

            // find user based on the id in the decoded token
            if(!req.user_id)
                return res.status(403).send({
                    success: false,
                    message: "Unauthorized"
                })

            // return only relevant information for the user
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

            // ensure correct input
            if(!first_name | !last_name | !mobile) 
                return res.status(400).json(empty_field)
            
            // find customer by their ID
            db.customer.findById(req.user_id, (err,user) => {
                if(err) 
                    return res.status(500).json({
                        succes: false,
                        message: err.message
                    })
                if(!user) 
                    return res.status(404).json({
                        success: false,
                        message: "User was not found"
                    })
                user.first_name = first_name
                user.last_name = last_name
                user.mobile = mobile
                // update the found user
                user.save(err => {
                    if(err)
                        return res.status(500).json({
                            success: false,
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

            // find an admin based on decoded token 
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
                // let admin edit their information
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
    // @desc    let's uer request to reset a forgotten password
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
                // generate a 32 byte random string and save it as hex in the db
                crypto.randomBytes(32, (err, buffer) => {
                    if(err)
                        return res.status(500).send({
                            success: false,
                            message: err.message
                        })
                    var myDate = new Date()
                    user.reset_password_token = buffer.toString('hex');
                    // set an expirary of the generated hex to be 24 hours
                    user.reset_password_expires = new Date(myDate.getTime() + 86400000)
                    user.save(err => {
                        if(err)
                            return res.status(500).send({
                                succes: false,
                                message: err.message
                            })
                        // set up the data object to be sent in the nodemailer email
                        var data = {
                            to: user.email,
                            from: email,
                            template: 'forgot-password-email',
                            subject: 'Request to Reset Password',
                            context: {
                                url: domain + '/user/reset-password-email/token/'+ buffer.toString('hex') + '/email/' + user.email,
                                name: user.first_name,
                                // this is only temporary while the link doesnt work
                                token: buffer.toString('hex')
                            }
                        }
            
                        // send the email to the found users email address for them to resset their password
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
    // @desc    User has recieved a link to reset their email
    // @access  Public

    async post_reset_password_email(req,res) {
        try{
            if(!req.body.new_password | !req.body.email | !req.body.token) 
                    return res.status(400).send(empty_field)
            // find user by email
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
                // if their is no token or expiry date, reject the request
                if(user.reset_password_token == null | user.reset_password_expires == null)
                    return res.status(403).send({
                        success: false,
                        message: "Forbidden"
                    })
                // if the tokens do not match reject the request
                if(user.reset_password_token !== req.body.token) 
                    return res.status(401).send({
                        success: false,
                        message: "Unauthorized"
                    })
                // if the token has expired reject the request
                if(user.reset_password_expires < Date.now()) {
                    return res.status(401).send({
                        success: false,
                        message: "Unauthorized"
                    })
                }
                // make sure the new password meets the criteria
                const found = req.body.new_password.match(db.passwordRegex)
                if(found == null)
                    return res.status(400).send({
                        success: false,
                        message: "Password does not meet the criteria"
                    })
                // make sure the new password doesn't match the current password
                var new_password_compare = await bcrypt.compare(req.body.new_password, user.password)
                if(new_password_compare)
                    return res.status(400).send({
                        success: false,
                        message: "New password cannot be the same as an old password"
                    })
                // hash new password and expire the token and end date
                user.password = bcrypt.hashSync(req.body.new_password, salt_rounds)
                user.reset_password_expires = null
                user.reset_password_token = null
                // save the updated user
                user.save((err,user) => {
                    if(err)
                        return res.status(500).send({
                            success: false,
                            message: err.message
                        })
                    // set the data of the email
                    var data = {
                        to: user.email,
                        from: email,
                        template: 'reset-password-confirmation-email',
                        subject: 'Password Reset Confirmation',
                        context: {
                            name: user.first_name
                        }
                    }
                    // send confirmation email
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

    // @route   /api/user/change-password
    // @desc    allow a user to change their password while logged in   
    // @access  Signed in user

    async post_reset_password_request(req,res) {
        try{
            if(!req.body.new_password | !req.body.verify_password) 
                    return res.status(400).send(empty_field)
            // find user by their email
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
                // ensure that the password meets the criteria
                const found = req.body.new_password.match(db.passwordRegex)
                if(found == null)
                    return res.status(400).send({
                        success: false,
                        message: "Password does not meet the criteria"
                    })
                
                // ensure that the verify password matches the stored password before changing 
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
                // hash the new password
                user.password = await bcrypt.hash(req.body.new_password, salt_rounds)
                // save updated user password
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