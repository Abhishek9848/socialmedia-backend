const express = require('express')
const { authUser } = require('../middlewares/auth')
const { createPost, getPostsById, allPosts } = require('../controllers/post')
const router = express.Router()

router.post('/createPost', authUser, createPost)
router.get('/posts/:id', authUser, getPostsById)
router.get('/getallposts', authUser, allPosts)

module.exports = router