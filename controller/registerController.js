const User = require('../model/User')
const Category = require('../model/Category')

// Helper function to get menuItems for the sidebar
async function getMenuItems() {
    const categories = await Category.find().sort({ id: 1 })
    const menuItems = {}
    categories.forEach(cat => {
        if (!menuItems[cat.parentCategory]) {
            menuItems[cat.parentCategory] = []
        }
        menuItems[cat.parentCategory].push({ id: cat.id, name: cat.name })
    })
    return Object.keys(menuItems).map(parent => ({
        parent: parent,
        subcategories: menuItems[parent]
    }))
}

const registerController = {
    showRegisterForm: async (req, res) => {
        const menuItems = await getMenuItems()
        res.render('registration', {
            title: 'Register',
            pageCss: 'registration',
            formData: {},
            menuItems: menuItems
        })
    },

    processRegister: async (req, res) => {
        let menuItems;
        try {
            const { email, username, password, 'repeat-password': repeatPassword } = req.body
            menuItems = await getMenuItems()

            // 1. Check for Password Mismatch
            if (password !== repeatPassword) {
                return res.render('registration', {
                    title: 'Register',
                    pageCss: 'registration',
                    formData: { email, username },
                    menuItems: menuItems,
                    error: 'Passwords do not match!',
                    showPopup: true
                })
            }

            // 2. Check if User/Email already exists 
            const existingUser = await User.findOne({
                $or: [
                    { email: email.toLowerCase() },
                    { username: username }
                ]
            })

            if (existingUser) {
                const errorMsg = existingUser.email === email.toLowerCase() 
                    ? 'This email is already registered.' 
                    : 'This username is already taken.';
                
                return res.render('registration', {
                    title: 'Register',
                    pageCss: 'registration',
                    formData: { email, username },
                    menuItems: menuItems,
                    error: errorMsg,
                    showPopup: true
                })
            }

            // 3. Create and Save User
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: password, 
            })

            await newUser.save()

            // 4. Redirect to login with success flag
            res.redirect('/login?success=true')

        } catch (error) {
            console.error('Registration error:', error)
            if (!menuItems) menuItems = await getMenuItems()
            
            res.render('registration', {
                title: 'Register',
                pageCss: 'registration',
                formData: req.body,
                menuItems: menuItems,
                error: 'An unexpected database error occurred.',
                showPopup: true
            })
        }
    }
}

module.exports = registerController