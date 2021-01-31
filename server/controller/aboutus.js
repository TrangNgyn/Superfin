const { readFileSync, writeFileSync, write } =  require('fs')

class aboutUs {
    async get_company_info(req,res) {
        try{
            var info = JSON.parse(readFileSync('./config/aboutus.txt', 'utf-8'))
            return res.json(info)
        }
        catch (err) {
            console.log(err)
        }
    }

    async post_edit_company_info(req,res) {
        try{
            let { c_number, c_address, c_email, c_TandC, c_about, c_delivery, c_blog } = req.body

            if ( !c_number | !c_address | !c_email | !c_TandC | !c_about | !c_delivery | !c_blog) {
                return res.json({ success: false,
                                  message: "All fields must be populated" })
            }

            var newInfo = JSON.stringify(req.body)

            writeFileSync('./config/aboutus.txt', newInfo)

            return res.json({ success: true })
        }
        catch (err){
            console.log(err)
        }
    }
}

const about_controller = new aboutUs
module.exports = about_controller