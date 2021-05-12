const { verify_sign_up } = require("../../middleware/auth_middleware")
const controller = require('../../controller/auth')

module.exports = function(app) {

    app.post("/api/auth/sign_up",
    [
        verify_sign_up.check_duplicate_email,
        verify_sign_up.check_roles_exist
    ], controller.sign_up) // public 

    app.post("/api/auth/sign_in", controller.sign_in) // public
}