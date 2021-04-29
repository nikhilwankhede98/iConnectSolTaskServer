const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token')

    // Check For Token
    if(!token) return res.status(401).json({msg: 'No Token, authorization denied!'})
    
    try{
        // Verify Token
        const decoded = jwt.verify(token, config.get('jwtSecret'))
    
        // Add User From Payload
        req.user = decoded
        next()
    } catch(e) {
        res.status(400).json({ msg: 'Token is not valid!' })
    }
}

module.exports = auth