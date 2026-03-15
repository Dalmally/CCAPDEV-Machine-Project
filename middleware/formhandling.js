
const express = require('express')

const setupFormHandling = (app) => {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
}

module.exports = setupFormHandling