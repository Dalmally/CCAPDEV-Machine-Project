const User = require('../model/User');
const Category = require('../model/Category');
const bcrypt = require('bcrypt');

async function getMenuItems() {
    const categories = await Category.find().sort({ id: 1 });
    const menuItems = {};
    categories.forEach(cat => {
        if (!menuItems[cat.parentCategory]) {
            menuItems[cat.parentCategory] = [];
        }
        menuItems[cat.parentCategory].push({ id: cat.id, name: cat.name });
    });
    return Object.keys(menuItems).map(parent => ({
        parent: parent,
        subcategories: menuItems[parent]
    }));
}

const loginController = {
    showLoginForm: async (req, res) => {
        const menuItems = await getMenuItems();
        res.render('login', {
            title: 'Login',
            pageCss: 'login',
            email: '',
            menuItems: menuItems
        });
    },

    processLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const menuItems = await getMenuItems();

            // 1. Validate Input
            if (!email || !password) {
                return res.render('login', {
                    title: 'Login',
                    pageCss: 'login',
                    email: email || '',
                    menuItems: menuItems,
                    error: 'Please enter both email and password',
                    showPopup: true // Flag for JS alert
                });
            }

            // 2. Find User
            const user = await User.findOne({ email: email.toLowerCase() });
            const isPasswordValid = user && await bcrypt.compare(password, user.password);

            // 3. Check User and Password
            if (!user || !isPasswordValid) {
                return res.render('login', {
                    title: 'Login',
                    pageCss: 'login',
                    email: email,
                    menuItems: menuItems,
                    error: 'Invalid email or password',
                    showPopup: true // Flag for JS alert
                });
            }

            // 4. Handle Session
            req.session.user = {
                _id: user._id,
                username: user.username,
                email: user.email
            };

            req.session.save((err) => {
                if (err) {
                    console.error('Session save error:', err);
                    return res.redirect('/login');
                }
                res.redirect('/home');
            });

        } catch (error) {
            console.error('Login error:', error);
            const menuItems = await getMenuItems();
            res.render('login', {
                title: 'Login',
                pageCss: 'login',
                email: req.body.email || '',
                menuItems: menuItems,
                error: 'An unexpected error occurred',
                showPopup: true
            });
        }
    }
};

module.exports = loginController;