const express = require('express')
const exphbs = require('express-handlebars')
const path= require('path')
require('dotenv').config()

const app = express()
app.use(express.static('public'))

app.use(express.static(__dirname + "/public"))
app.engine("hbs", exphbs.engine({extname: 'hbs'}))
app.set("view engine", "hbs")
app.set("views", "./views")

const PORT = 3000 || process.env.PORT

app.use('/', require('./server/routes/main'))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})