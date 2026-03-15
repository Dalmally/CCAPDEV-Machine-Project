const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

router.get('/profile/:username', profileController.getProfile);

module.exports = router;