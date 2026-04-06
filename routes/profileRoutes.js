const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

router.get('/edit', profileController.showEditProfile);
router.post('/edit', profileController.updateProfile);

router.get('/:username', profileController.getProfile);

module.exports = router;