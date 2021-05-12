const db = require('../models/db')

check_duplicate_email =  (req,res,next) => {
    db.user.findOne({
        email: req.body.email
    }).exec((err, result) => {
        if(err){
            return res.status(500).send({ 
                success: false,
                message: err
            })
        }
        if(result) {
            return res.status(400).send({
                success: false,
                message: "Failed! Email is already in use"
            })
        }
        next()
    })
}

check_roles_exist = (req,res,next) => {
    if(req.body.roles) {
        for(let i = 0; i < req.body.roles.length; i++) {
            if(!db.ROLES.includes(req.body.roles[i])) {
                return res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist.`
                })
                return
            }
        }
    }
    next()
}

const verify_sign_up = {
    check_duplicate_email,
    check_roles_exist
}

module.exports = verify_sign_up;