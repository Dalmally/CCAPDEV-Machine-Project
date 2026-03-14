const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')
// Login routes
router.get('/login', loginController.showLoginForm)
router.post('/login', loginController.processLogin)

module.exports = router