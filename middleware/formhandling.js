
const express = require('express')
const session = require('express-session')

const setupFormHandling = (app) => {
    // Parse form data
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    
    // Set up sessions
    app.use(session({
        secret: 'your-secret-key-change-this',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000 // 24 hours default
        }
    }))
    
    // Make user available to all templates
    app.use((req, res, next) => {
        res.locals.user = req.session.user || null
        next()
    })
}

module.exports = setupFormHandling