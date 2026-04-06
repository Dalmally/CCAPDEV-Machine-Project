const express = require('express')
const router = express.Router()
const postController = require('../controller/postController')

router.post('/create', postController.addPost)
router.get('/api/posts', postController.getPosts)
router.get('/:id', postController.getPostById)
router.post('/:id/upvote', postController.upvotePost)
router.post('/:id/downvote', postController.downvotePost)
router.post('/:id/delete', postController.deletePost)
router.post('/:postId/comment/:commentId/delete', postController.deleteComment)

module.exports = router