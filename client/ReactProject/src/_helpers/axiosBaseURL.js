var domain = 'http://localhost:5000'
if(process.env.NODE_ENV ==  'production')
    domain = 'http://54.252.17.165'

module.exports = domain
