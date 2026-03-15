const express = require('express')
const router = express.Router()
const registerController = require('../controller/registerController')

router.get('/register', registerController.showRegisterForm)
router.post('/register', registerController.processRegister)

module.exports = router