const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY


exports.generateToken =(payload , expired) =>{
    return jwt.sign(payload , secret , {
        expiresIn: expired
    })
}