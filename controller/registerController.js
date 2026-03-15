const User = require('../model/User')

const registerController = {
    showRegisterForm: (req, res) => {
        res.render('register', {
            title: 'Register',
            pageCss: 'register',
            formData: {}
        })
    },

    processRegister: async (req, res) => {
        try {
            const { email, username, password, 'repeat-password': repeatPassword } = req.body

            
            if (password !== repeatPassword) {
                return res.render('register', {
                    title: 'Register',
                    formData: { email, username } 
                })
            }

            
            const existingUser = await usersCollection.findOne({
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

            res.render('register', {
                title: 'Register',
                formData: {}
            })

        } catch (error) {
            console.error('Registration error:', error)

            res.render('register', {
                title: 'Register',
                formData: req.body
            })
        }
    }
}

module.exports = registerController