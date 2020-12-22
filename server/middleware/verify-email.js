const customerModel = require('../models/customer');

// checks if email exists
exports.checkDuplicatedEmail = (req,res,next)=>{
	let email = req.body.email;
	let checkEmail = customerModel.findOne({email:email}); // find matched email
	checkEmail.exec((err,data)=>{
		if(err) throw err;
		if(data){          // if a matched email found
            return true;
		}
	next();
	})
}

/* Uncomment to use this function
// checks if username already exists
exports.checkDuplicatedUsername = (req,res,next)=>{
	let name = req.body.username;
	let checkName = userModel.findOne({username:username}); // find matched username
	checkName.exec((err,data)=>{
		if(err) throw err;
		if(data){           // if username already exists
            return res.render('signup', 
                  { title: 'PMS Signup', msg:`Username ${username} already exists. Please try again.` });
		}
	next();
	})
}
*/

exports.verifySignUp = {
    if(checkDuplicatedEmail){
		return res.render('signup', 
                            { title: 'PMS Signup', msg:`Email ${email} Already Exists` })
	}
    // checkDuplicatedUsername
}