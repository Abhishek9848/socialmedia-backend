const jwt = require('jsonwebtoken')

exports.authUser = (req, res, next) => {
    try {
        let temp = req.header("Authorization")
        console.log("temp -->>", temp)
        const token = temp?.slice(7, temp.length);
        if (!token) return res.status(400).json({ message: "Invalid Authorization" })
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.status(400).json({ message: "Invalid Authorization" })
            req.user = user
            next()
        })
    } catch (err) {
        next(err)
    }
}