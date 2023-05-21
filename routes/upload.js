const express = require('express')
const { authUser } = require('../middlewares/auth')
const { uploadImage } = require('../controllers/upload')
const checkImage = require('../middlewares/uploadImage')
const router = express.Router()

router.post('/uploadImages',checkImage, uploadImage)

module.exports = router