const express = require('express')
const router = express.Router()
const loginController = require('../controller/loginController')

// Login routes
router.get('/login', loginController.showLoginForm)
router.post('/login', loginController.processLogin)

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Error logging out:", err);
            return res.redirect('/home');
        }
        res.clearCookie('connect.sid'); // This clears the session cookie
        res.redirect('/login'); // Send them back to login page
    });
})

module.exports = router