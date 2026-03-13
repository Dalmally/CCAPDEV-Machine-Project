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

router.get('/viewcategory', (req, res) => {
    res.render('iewcategory', data)
})

router.get('/createpost', (req, res) => {
    res.render('createpost', data)
})

router.get('/login', (req, res) => {
    res.render('login', data)
})

router.get('/registration', (req, res) => {
    res.render('registration', data)
})

router.get('/editprofile', (req, res) => {
    res.render('editprofile', data)
})

router.get('/profile', (req, res) => {
    res.render('profile', data)
})

router.get('/search', (req, res) => {
    res.render('search', data)
})

router.get('/viewpost', (req, res) => {
    res.render('viewpost', data)
})

module.exports = router;