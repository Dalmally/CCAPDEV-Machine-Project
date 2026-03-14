const express = require('express')
const hbs  = require('express-handlebars')
const router = express.Router()

//Routes
router.get('/', (req, res) => {
    var data = {
        test: "If you see this, handlebars is working"
    }
    
    res.render('index', data)
})

router.get('/home', (req, res) => {
    res.render('home')
})

router.get('/viewcategory', (req, res) => {
    res.render('iewcategory')
})

router.get('/createpost', (req, res) => {
    res.render('createpost')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/registration', (req, res) => {
    res.render('registration')
})

router.get('/editprofile', (req, res) => {
    res.render('editprofile')
})

router.get('/profile', (req, res) => {
    res.render('profile')
})

router.get('/search', (req, res) => {
    res.render('search')
})

router.get('/viewpost', (req, res) => {
    res.render('viewpost')
})

module.exports = router;