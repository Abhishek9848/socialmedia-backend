const { validateEmail, checkUserName } = require("../helpers/validation");
const User = require("../model/user")
const { hashSync, genSaltSync, compare } = require('bcrypt');
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");
const { message } = require("../messageText");
const jwt = require('jsonwebtoken');
const { createError } = require("../helpers/error");

exports.register = async (req, res, next) => {
    try {
        console.log("email ---", req.body)
        if (!validateEmail(req.body.email)) {
            return res.status(400).send({ message: "Invalid Email Id" })
        }
        const check = await User.findOne({ email: req.body.email })
        if (check) {
            return res.status(400).send({ message: "Email already exist! try with another email id" })
        }
        const hashedPassword = await hashSync(req.body.password, genSaltSync(12))
        const tempUserName = req.body.firstName + req.body.lastName
        let newUserName = await checkUserName(tempUserName)
        const user = new User({ ...req.body, userName: newUserName, password: hashedPassword })
        const savedUser = await user.save();
        const emailVerificationToken = generateToken({ id: savedUser._id.toString() }, "30m")
        const token = generateToken({ id: savedUser._id.toString() }, "7d")
        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`
        sendVerificationEmail(savedUser.email, savedUser.firstName, url)
        savedUser.password = undefined
        res.status(201).send({
            id: user._id,
            username: user.userName,
            picture: user.picture,
            firstName: user.firstName,
            lastName: user.lastName,
            token: token,
            verified: user.verified,
            message: message.userRegistration
        })
    } catch (err) {
        next(err)
    }
}

exports.resendVerificationMail = async (req, res, next) => {
    try {
        const { username } = req.body
        const user = await User.findOne({ $or: [{ "userName": username }, { "email": { $regex: username, $options: 'i' } }] })
        console.log("user --->>", user)
        if (!user) return next(createError(404, "User not found!"))
        const emailVerificationToken = generateToken({ id: user._id.toString() }, "30m")
        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`
        await sendVerificationEmail(user.email, user.firstName, url)
        res.status(200).json({ success: true, message: 'Mail sent , check your Inbox' })
    } catch (err) {
        next(err)
    }
}

exports.verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.body
        const user = jwt.verify(token, process.env.SECRET_KEY)
        const check = await User.findOne({ _id: user.id })
        if (check && check.verified) {
            return res.status(400).send({
                message: message.alreadyVerified
            })
        }
        await User.findByIdAndUpdate(user.id, { verified: true });
        res.status(200).send({
            message: message.verified,
            success: true,
        })
        console.log(token)
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username } = req.body
        const user = await User.findOne({ $or: [{ "userName": username }, { "email": { $regex: username, $options: 'i' } }] })
        if (!user) return next(createError(404, "User not found!"))
        const isPasswordCorrect = await compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(400, "Wrong password"))
        const token = generateToken({ id: user._id.toString() }, "7d")
        res.status(201).send({
            id: user._id,
            username: user.userName,
            picture: user.picture,
            firstName: user.firstName,
            lastName: user.lastName,
            token: token,
            verified: user.verified
        })
    } catch (err) {
        next(err)
    }
}

exports.auth = async (req, res) => {
    res.send({ message: "all ok" })
}