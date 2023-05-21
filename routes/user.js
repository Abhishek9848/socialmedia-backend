const express = require('express');
const { register, verifyEmail, login, auth, resendVerificationMail } = require('../controllers/user');
const { authUser } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', register)
router.post('/activate', verifyEmail)
router.post('/login', login)
router.post('/auth', authUser, auth)
router.post('/resend-activation-link', resendVerificationMail)

module.exports = router