const User = require('../model/User')
const Post = require('../model/Post')
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

const profileController = {
    getProfile: async (req, res) => {
        try {
            const { username } = req.params;

            const user = await User.findOne({
                username: username
            })

            if (!user) {
                const menuItems = await getMenuItems()
                return res.status(404).render('profile', {
                    title: 'User Not Found',
                    pageCss: 'profile',
                    user: null,
                    menuItems: menuItems
                })
            }

            const posts = await Post.find({
                user_id: user.user_id
            }).sort({ created_at: -1 })

            const formattedPosts = posts.map(post => ({
                title: post.title,
                content: post.content.substring(0, 200) + (post.content.length > 200 ? '...' : ''),
                date: post.created_at.toDateString(),
                post_id: post.post_id
            }))

            const menuItems = await getMenuItems()
            res.render('profile', {
                title: user.username,
                pageCss: 'profile',
                user: {
                    username: user.username,
                    bio: user.bio || 'No bio',
                    badge: user.badge,
                    avatar_url: user.avatar_url || '/public/default-avatar.jpg',
                    posts: formattedPosts,
                    postCount: posts.length
                },
                menuItems: menuItems
            })
        } catch (error) {
            console.error('Error fetching profile', error)
            const menuItems = await getMenuItems()
            res.status(500).render('profile', {
                title: 'Error',
                pageCss: 'profile',
                user: null,
                menuItems: menuItems
            })
        }
    }
}

module.exports = profileController;