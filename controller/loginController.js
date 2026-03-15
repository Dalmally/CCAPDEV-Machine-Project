const User = require('../model/User')

const loginController = {
    
    showLoginForm: (req, res) => {
        res.render('login', {
            title: 'Login',
            pageCss: 'login',
            error: null,
            email: '' 
        })
    },

    processLogin: async (req, res) => {
        try {
            const { email, password } = req.body
            
            if (!email || !password) {
                return res.render('login', {
                    title: 'Login',
                    error: 'Email and password are required',
                    email: email || ''
                })
            }

            
            const user = await User.findOne({ 
                email: email.toLowerCase() 
            })

            
            if (!user) {
                return res.render('login', {
                    title: 'Login',
                    error: 'Invalid email or password',
                    email: email
                })
            }

            
            
            if (password != User.password) {
                return res.render('login', {
                    title: 'Login',
                    error: 'Invalid email or password',
                    email: email
                })
            }

            res.render('dashboard', {
                title: 'Dashboard',
                user: {
                    username: user.username,
                    email: user.email,
                    user_id: user.user_id,
                    created_at: user.created_at
                },
            })

        } catch (error) {
            console.error('Login error:', error)
            res.render('login', {
                title: 'Login',
                error: 'An error occurred during login. Please try again.',
                email: req.body.email || ''
            })
        }
    }
}


module.exports = loginController