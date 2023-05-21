const express = require('express')
const { authUser } = require('../middlewares/auth')
const { createPost } = require('../controllers/post')
const router = express.Router()

router.post('/createPost', authUser, createPost)
router.get('/posts', authUser, createPost)

module.exports = router