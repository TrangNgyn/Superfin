const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const async = require('async');
const crypto = require('crypto');
const _ = require('lodash');
const hbs = require('nodemailer-express-handlebars');
const email = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com';
const pass = process.env.MAILER_PASSWORD || 'auth_email_pass';
const nodemailer = require('nodemailer');

//const User = mongoose.model('customer');
const customer_model = require('../models/customer');

var empty_field = { error: "All fields must be filled" }

var smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
      user: email,
      pass: pass
    }
})
  
var handlebarsOptions = {
   viewEngine: 'handlebars',
   viewPath: path.resolve('./templates/'),
   extName: '.html'
}
  
smtpTransport.use('compile', hbs(handlebarsOptions));

class Customer {
    
    // @route   GET api/customers/all-customers
    // @desc    Get all customers
    // @access  Public

    async get_all_customers(req,res) {
        try{            
            // DO NOT DELETE -- For future reference
            // role_model.findOne({name: 'customer_role'}, {_id: 1}, function(err, docs){
            //     // Get the id of the customer_role document
            //     var c_id = docs._id;

            //     // Get the users who are customers
            //     customer_model
            //         .find({Role: new ObjectId(c_id)})
            //         .sort({ EmailAddress: 1 })
            //         .then(customer_model => res.json(customer_model));
            // }) 
            customer_model
                .find()
                .sort({ email: 1 })
                .then(customer_model => res.json(customer_model));

        }catch(err) {
            console.log(err)
        }
    }

    // @route   POST api/customers/customer-by-email
    // @desc    Get all customers sorted by email
    // @access  Public

    async post_customer_by_email(req, res) {
        // Using fetch
        let {email} = req.body;
        // Get the users with matched email
        customer_model
            .find({email: email})
            .exec()
            .then((user) => {
                if (!user) {
                    res.status(404)
                    return res.json({success: false})
                }
                return res.json(user)
            })
            .catch(err => res.json(err))
    }

    
    // @route   POST api/products/edit-product
    // @desc    edit an existing product
    // @access  Public

    async post_edit_user_info(req, res) {
        try {
            let editedUser = req.body;
            
            // check for empty fields in req.body
            if(req.body.constructor === Object && Object.keys(req.body).length === 0 ) {
                return res.json(empty_field);
            }
            else if(!editedUser.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                return res.json({ error: "Input email is not valid"})
            } // checks for suburb, state, country and mobile number
            else {
                customer_model.findOne({email: editedUser.email}, {_id: 1}, function(err, docs){
                    // Get the id of the customer_role document
                    var c_id = docs._id;
                    customer_model.findByIdAndUpdate(c_id, editedUser , 
                        {new: true, useFindAndModify: false})
                    .exec()
                    .then((customer) => {
                        if (!customer) {
                            res.status(404) // no document found
                            return res.json({success: false})
                        }
                        return res.json({_id: customer._id, email: customer.email,
                            full_name: customer.first_name + ' ' + customer.last_name,
                            mobile: customer.mobile_number,
                            po_address: customer.po_address_line1 + ' ' + customer.po_address_line2
                                    + ', ' + customer.po_suburb + ', ' + customer.po_state
                                    + customer.po_postcode + ', ' + customer.po_country})
                    })
                    .catch(err => res.json(err))
                }) 
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    

    /* ====== Authentication ====== */

    // @route   POST api/customers/auth/register
    // @desc    Register a customer
    // @access  Public 
    async post_register (req, res) {
        var newUser = new customer_model(req.body);
        newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
        newUser.save(function(err, user) {
            if (err) {
                return res.status(400)
                        .send({ message: err });
            } else {
                user.hash_password = undefined;
                return res.json(user);
            }
        });
    }
    
    /* 
        Render home, forgot-password and reset-password pages 
        Change the paths when the frontend is done
    */
    // @route   GET api/customers/auth/forgot-password 
    //       OR GET api/customers/auth/reset-passwor
    // @desc    Pages to be rendered as their corresponding functions are called
    // @access  Public 
    async index(req, res) {
        return res.sendFile(path.resolve('./public/index.html'));
    }    

    async render_forgot_password_template(req, res) {
        return res.sendFile(path.resolve('./public/forgot-password.html'));
    }

    async render_reset_password_template(req, res) {
        return res.sendFile(path.resolve('./public/reset-password.html'));
    }
    
    // @route   POST api/customers/auth/sign-in
    // @desc    Sign in as a customer, return the JWT if success
    // @access  Public    
    async post_sign_in(req, res) {
        let {email, password} = req.body;
        // if req.body is incomplete
        if(!email | !password)
            return res.json(empty_field);
        
        customer_model
            .findOne({email: email},
                function(err, user) {
                    if (err) throw err;

                    // Authenticate using Password
                    if (!user || !user.comparePassword(password)) {
                        return res.status(401)
                            .json({ message: 'Authentication failed. Invalid email or password.' });
                    }

                    // return the token if signed in successfully
                    return res.json({ token: jwt.sign({ email: user.email, 
                                    fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
                    
                    // uncomment for testing
                    // return res.json(`Signed in as ${user.first_name} ${user.last_name}`);
                });
    }
    
    async loginRequired(req, res, next) {
        if (req.user) {
          next();
        } else {
          return res.status(401).json({ message: 'Unauthorized user!' });
        }
    }
      
    /**
     * Reset password -- Pending
    */
    // @route   POST api/customers/auth/forgot-password
    // @desc    Send an email to the user with the link to reset their password
    // @access  Public   
    async post_forgot_password(req, res) {
        async.waterfall([
          function(done) {
            // check if email exists
            customer_model
                .findOne({email: req.body.email})
                .exec(function(err, user) {
                    if (user) {
                        done(err, user);
                    } else {
                        done('User not found.');
                    }
                });
          },
          function(user, next) {
            // create the random token
            crypto.randomBytes(20, function(err, buffer) {
              var token = buffer.toString('hex');
                next(err, user, token);
            });
          },
          function(user, token, next) {
            customer_model
                .findByIdAndUpdate({ _id: user._id }, 
                    { reset_password_token: token, reset_password_expires: Date.now() + 86400 },
                    { upsert: true, new: true, useFindAndModify: true })
                .exec(function(err, new_user) {
                    next(err, token, new_user);
                });
          },
          function(token, user, done) {
            var data = {
              to: user.email,
              from: email,
              template: 'forgot-password-email',
              subject: 'Request to Reset Password',
              context: {
                url: '/auth/reset_password?token=' + token,
                name: user.first_name
              }
            };
      
            smtpTransport.sendMail(data, function(err) {
              if (!err) {
                return res.json({ message: 'Kindly check your email for further instructions' });
              } else {
                return done(err);
              }
            });
          }
        ], 
        function(err) {
          return res.status(422).json({ message: err });
        });
      }
      
    // @route   POST api/customers/auth/reset-password
    // @desc    Update hashed password and send an email confirmation
    // @access  Public   
    async post_reset_password(req, res, next) {
        customer_model
            .findOne({
                reset_password_token: req.body.token,
                reset_password_expires: {
                    $gt: Date.now()
                }
            })
            .exec(function(err, user) {
                if (!err && user) {
                    if (req.body.newPassword === req.body.verifyPassword) {
                        user.hash_password = bcrypt.hashSync(req.body.newPassword, 10);
                        user.reset_password_token = undefined;
                        user.reset_password_expires = undefined;
                        
                        user.save(function(err) {
                            if (err) {
                                return res.status(422).send({message: err});
                            } else {
                                var data = {
                                    to: user.email,
                                    from: email,
                                    template: 'reset-password-confirmation-email',
                                    subject: 'Password Reset Confirmation',
                                    context: {
                                        name: user.first_name
                                    }
                                };
                    
                                smtpTransport.sendMail(data, function(err) {
                                    if (!err) {
                                        return res.json({ message: 'Password reset' });
                                    } else {
                                        return done(err);
                                    }
                                });
                            }
                        });
                    } else {
                        return res.status(422).send({message: 'Passwords do not match'});
                    }
                } else {
                    return res.status(400)
                            .send({message: 'Password reset token is invalid or has expired.'});
                }
            });
    }
    
}

module.exports = new Customer;
