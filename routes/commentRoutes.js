const express = require('express')
const router = express.Router()
const commentController = require('../controller/commentController')

router.post('/add', commentController.addComment)
router.get('/:post_id', commentController.getComments)

module.exports = router