const express = require('express')
const hbs  = require('express-handlebars')
const router = express.Router()
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

//Routes
router.get('/', (req, res) => {
    res.redirect('/home')
})

router.get('/home', async (req, res) => {
    try {
        const posts = await Post.find().sort({ created_at: -1 }).populate({ path: 'user_id', model: 'User', foreignField: 'user_id', select: 'username' }).limit(10)
        const menuItems = await getMenuItems()
        res.render('home', {
            title: 'Home',
            pageCss: 'home',
            posts: posts.map(post => ({
                title: post.title,
                contentPreview: post.content.substring(0, 200) + (post.content.length > 200 ? '...' : ''),
                category: 'General', // Placeholder, can map to category name
                categoryId: post.category_id,
                username: post.user_id ? post.user_id.username : 'Unknown',
                post_id: post.post_id
            })),
            menuItems: menuItems
        })
    } catch (error) {
        console.error('Error fetching home data:', error)
        res.render('home', {
            title: 'Home',
            pageCss: 'home',
            posts: [],
            menuItems: []
        })
    }
})

router.get('/viewcategory', async (req, res) => {
    const menuItems = await getMenuItems()
    res.render('viewcategory', {
        title: 'View Category',
        pageCss: 'categories',
        menuItems: menuItems
    })
})

router.get('/createpost', async (req, res) => {
    try {
        const categories = await Category.find().sort({ id: 1 })
        const menuItems = await getMenuItems()
        res.render('createpost', {
            title: 'Create Post',
            pageCss: 'main',
            categories: categories,
            menuItems: menuItems
        })
    } catch (error) {
        console.error('Error fetching categories:', error)
        res.render('createpost', {
            title: 'Create Post',
            pageCss: 'main',
            categories: [],
            menuItems: []
        })
    }
})

router.get('/editprofile', async (req, res) => {
    const menuItems = await getMenuItems()
    res.render('editprofile', {
        title: 'Edit Profile',
        pageCss: 'editprofile',
        menuItems: menuItems
    })
})

router.get('/profile', (req, res) => {
    res.render('profile', {
        title: 'Profile',
        pageCss: 'profile'
    })
})

router.get('/search', async (req, res) => {
    const menuItems = await getMenuItems()
    res.render('search', {
        title: 'Search',
        pageCss: 'search',
        menuItems: menuItems
    })
})

router.get('/viewpost', async (req, res) => {
    const menuItems = await getMenuItems()
    res.render('viewpost', {
        title: 'View Post',
        pageCss: 'viewpost',
        menuItems: menuItems
    })
})

module.exports = router