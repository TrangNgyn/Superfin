const config = require('../config/auth_config'),
    db = require('../models/db'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    user = require('../models/user')

var salt_rounds = 12

var empty_field = { 
    success: false,
    error: "All fields must be filled" 
}



exports.sign_up =  (req,res) => {
    try{
    // add check that email is real?
    if(!req.body.email | !req.body.password | !req.body.first_name | !req.body.last_name | !req.body.mobile)
        return res.status(400).send(empty_field)
    
    const found =  req.body.password.match(db.passwordRegex)
    if(found == null)
        return res.status(400).send({
            success: false,
            message: "Password does not meet the criteria"
        })
    const customer = new db.customer({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt_rounds),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile
    });
    customer.save((err,customer) => {
        if(err) {
            console.log(err)
            return res.status(500).send({
                success: false,
                message: err
            })
        }
        db.role.find({ name: {$in: ['customer']} }, (err, roles) => {
            if(err) {
                console.log(err)
                return res.status(500).send({
                    success: false,
                    message: err
                })
            }
            customer.roles = roles.map(role => role._id)
            customer.save(err => {
                if(err) {
                    console.log(err)
                    return res.status(500).send({
                        success: false,
                        message: err
                    })
                }
                return res.send({
                    success: true,
                    message: "Customer was registered Successfully"
                })
            })
        })
    })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
}


// this is only for inserting admins for test/dev will not be available in production
exports.sign_up_admin =  (req,res) => {
    try{    
    const found =  req.body.password.match(db.passwordRegex)
    if(found == null)
        return res.status(400).send({
            success: false,
            message: "Password does not meet the criteria"
        })
    const admin = new db.admin({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt_rounds),
        acc_name: req.body.acc_name
    });
    admin.save((err,customer) => {
        if(err) {
            console.log(err)
            return res.status(500).send({
                success: false,
                message: err
            })
        }
        db.role.find({ name: {$in: ['admin']} }, (err, roles) => {
            if(err) {
                console.log(err)
                return res.status(500).send({
                    success: false,
                    message: err
                })
            }
            admin.roles = roles.map(role => role._id)
            admin.save(err => {
                if(err) {
                    console.log(err)
                    return res.status(500).send({
                        success: false,
                        message: err
                    })
                }
                return res.send({
                    success: true,
                    message: "Admin was registered Successfully"
                })
            })
        })
    })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
}


exports.sign_in = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.user.findOne({
        email: email
    }).populate("roles").exec((err,user) => {
        if(err){
            console.log(err)
            return res.status(500).send({
                success: false,
                message: err
            })
        }
        if(!user) 
            return res.status(404).send({
                success: false,
                access_token: null,
                message: "User not found"
            })
        var pass_is_valid = bcrypt.compareSync(password, user.password)

        if(!pass_is_valid) {
            return res.status(401).send({
                success: false,
                access_token: null,
                message: "Invalid Password"
            })
        }
        
        var token = jwt.sign({ _id: user._id }, config.secret, {
            expiresIn: "30m"
        })

        var authorities = [];
        for(let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase())
        }

        res.send({
            access_token: token,
            token_type: "Bearer",
            roles: authorities,
            expires_in: ":1800",
        })
    })
}
