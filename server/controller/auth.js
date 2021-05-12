const config = require('../config/auth_config'),
    db = require('../models/db'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    user = require('../models/user')

var salt_rounds = 12

exports.sign_up =  (req,res) => {
    
    // add check that email is real?

    const customer = new db.customer({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt_rounds),
        first_name: req.body.first_name,
        last_name: req.body.last_name
    });
    customer.save((err,customer) => {
        if(err) {
            console.log(err)
            return res.status(500).send({
                success: false,
                message: err
            })
        }
        db.role.find({ name: {$in: ['user', 'customer']} }, (err, roles) => {
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
}

exports.sign_in = (req,res) => {
    db.user.findOne({
        email: req.body.email
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
                message: "User not found"
            })
        var pass_is_valid = bcrypt.compareSync(req.body.password, user.password)

        if(!pass_is_valid) {
            return res.status(401).send({
                access_token: null,
                message: "Invalid Password"
            })
        }
        
        var token = jwt.sign({ _id: user._id }, config.secret, {
            expiresIn: "6h"
        })

        var authorities = [];
        for(let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase())
        }

        res.status(200).send({
            user_id: user._id,
            email: user.email,
            roles: authorities,
            access_token: token
        })
    })
}
