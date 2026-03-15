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

const loginController = {
    
    showLoginForm: async (req, res) => {
        const menuItems = await getMenuItems()
        res.render('login', {
            title: 'Login',
            pageCss: 'login',
            email: '',
            menuItems: menuItems
        })
    },

    processLogin: async (req, res) => {
        try {
            const { email, password } = req.body
            
            if (!email || !password) {
                const menuItems = await getMenuItems()
                return res.render('login', {
                    title: 'Login',
                    pageCss: 'login',
                    email: email || '',
                    menuItems: menuItems
                })
            }

            
            const user = await User.findOne({ 
                email: email.toLowerCase() 
            })

            
            if (!user) {
                const menuItems = await getMenuItems()
                return res.render('login', {
                    title: 'Login',
                    pageCss: 'login',
                    email: email,
                    menuItems: menuItems
                })
            }

            
            if (password != user.password) {
                const menuItems = await getMenuItems()
                return res.render('login', {
                    title: 'Login',
                    pageCss: 'login',
                    email: email,
                    menuItems: menuItems
                })
            }

            res.redirect('/home')

        } catch (error) {
            console.error('Login error:', error)
            const menuItems = await getMenuItems()
            res.render('login', {
                title: 'Login',
                pageCss: 'login',
                email: req.body.email || '',
                menuItems: menuItems
            })
        }
    }
}


module.exports = loginController