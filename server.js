const express = require('express')
const exphbs = require('express-handlebars')
const path= require('path')
require('dotenv').config()
const { connectToMongo, getDb } = require('./model/conn');

//Routing stuff
const setupFormHandling = require('./middleware/formhandling')
const registerRoutes = require('./routes/registerRoutes')
const loginRoutes = require('./routes/loginRoutes')
const profileRoutes = require('./routes/profileRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')

const app = express()
app.use(express.static('public'))

setupFormHandling(app);

app.use(express.static(__dirname + "/public"))
app.engine("hbs", exphbs.engine({
    extname: 'hbs',
    helpers: {
        eq: (a, b) => a === b
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))
app.set("view engine", "hbs")
app.set("views", "./views")

const PORT = 3000 || process.env.PORT

app.use('/', require('./routes/main')) //Only here during development
app.use('/', registerRoutes)
app.use('/', loginRoutes)
app.use('/', profileRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)

connectToMongo((err) => {
    if (err) {
        console.error('failed to connect to MongoDB');
    } else {
        console.log('MongoDB connection established');
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})