const express = require('express');
const session = require('express-session'); 
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();
const { connectToMongo } = require('./model/conn');

// Routing imports
const setupFormHandling = require('./middleware/formhandling');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

// 1. Middleware & Statics
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Session Setup 
app.use(session({
    secret: 'forum-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// 3. Global Data Injection 
app.use(async (req, res, next) => {
    // Pass user session to all templates
    res.locals.user = req.session.user || null;

    try {
        const Category = require('./model/Category'); 
        const categories = await Category.find().sort({ id: 1 });
        
        const menuItemsMap = {};
        categories.forEach(cat => {
            const parent = cat.parentCategory || "General"; 
            if (!menuItemsMap[parent]) menuItemsMap[parent] = [];
            menuItemsMap[parent].push({ id: cat.id, name: cat.name });
        });

    
        res.locals.menuItems = Object.keys(menuItemsMap).map(parent => ({
            parent: parent,
            subcategories: menuItemsMap[parent]
        }));
    } catch (err) {
        console.error("Sidebar fetch failed:", err);
        res.locals.menuItems = [];
    }
    next();
});

setupFormHandling(app);

// 4. Handlebars Config
app.engine("hbs", exphbs.engine({
    extname: 'hbs',
    helpers: {
        eq: (a, b) => a === b,
        or: (a, b) => a || b 
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set("view engine", "hbs");
app.set("views", "./views");

// 5. Routes
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/profile', profileRoutes); 
app.use('/', require('./routes/main'));
app.use('/', registerRoutes);
app.use('/', loginRoutes);
app.use('/', categoryRoutes);

// 6. Server Start
const PORT = process.env.PORT || 3000;

connectToMongo((err) => {
    if (err) {
        console.error('Failed to connect to MongoDB');
    } else {
        console.log('MongoDB connection established');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
});