const User = require('../models/User')

const registerController = {
    showRegisterForm: (req, res) => {
        res.render('register', {
            title: 'Register',
            error: null,
            success: null,
            formData: {}
        })
    },

    processRegister: async (req, res) => {
        try {
            const { email, username, password, 'repeat-password': repeatPassword } = req.body

            
            if (password !== repeatPassword) {
                return res.render('register', {
                    title: 'Register',
                    error: 'Passwords do not match',
                    formData: { email, username } 
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
                
                return res.render('register', {
                    title: 'Register',
                    error: errorMsg,
                    formData: { email, username }
                })
            }

            const newUser = new User({
                user_id: nextUserId,
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

            // Success - redirect to login or show success message
            res.render('register', {
                title: 'Register',
                success: 'Registration successful! Please log in.',
                formData: {} // Clear form
            })

        } catch (error) {
            console.error('Registration error:', error)

            res.render('register', {
                title: 'Register',
                error: 'An error occurred during registration. Please try again.',
                formData: req.body
            })
        }
    }
}

module.exports = registerController