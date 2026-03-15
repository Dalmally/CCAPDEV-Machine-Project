const express = require('express')
const router = express.Router()
const postController = require('../controller/postController')

router.post('/create', postController.addPost)
router.get('/api/posts', postController.getPosts)
router.get('/:id', postController.getPostById)

module.exports = router