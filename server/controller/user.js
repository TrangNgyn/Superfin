const db = require('../models/db')

class User {

    // @route GET api/user/

    async get_user_info(req,res) {
        try{

            db.user.findOne({ _id: req.user_id }).select("-password -roles").exec((err,user) => {
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
                return res.json(user, );    
            })
            
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err.message
            })
        }
    }
}