const User = require('../model/User')
const Category = require('../model/Category')

// Helper function to get menuItems
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
        try {
            const { email, username, password, 'repeat-password': repeatPassword } = req.body

            
            if (password !== repeatPassword) {
                const menuItems = await getMenuItems()
                return res.render('registration', {
                    title: 'Register',
                    pageCss: 'registration',
                    formData: { email, username },
                    menuItems: menuItems
                })
            }

            
            const existingUser = await User.findOne({
                $or: [
                    { email: email.toLowerCase() },
                    { username: username }
                ]
            })

            if (existingUser) {
                let errorMsg = 'User already exists with this '
                if (existingUser.email === email.toLowerCase()) {
                    errorMsg += 'email'
                } else {
                    errorMsg += 'username'
                }
                const menuItems = await getMenuItems()
                return res.render('registration', {
                    title: 'Register',
                    pageCss: 'registration',
                    formData: { email, username },
                    menuItems: menuItems
                })
            }

            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: password,
            })

            await newUser.save()

            console.log('New user registered:', {
                user_id: newUser.user_id,
                username: newUser.username,
                email: newUser.email
            })


            

            res.redirect('/login')

        } catch (error) {
            console.error('Registration error:', error)
            const menuItems = await getMenuItems()
            res.render('registration', {
                title: 'Register',
                pageCss: 'registration',
                formData: req.body,
                menuItems: menuItems
            })
        }
    }
}

module.exports = registerController
