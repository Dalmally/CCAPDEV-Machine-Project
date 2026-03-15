const express = require('express')
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

router.get('/category/:id', async (req, res) => {
    try {
        const { id } = req.params
        const categoryId = parseInt(id)
        const category = await Category.findOne({ id: categoryId })
        const posts = await Post.find({ category_id: categoryId }).sort({ created_at: -1 }).populate({ path: 'user_id', model: 'User', foreignField: 'user_id', select: 'username' }).limit(10)
        const menuItems = await getMenuItems()
        res.render('viewcategory', {
            title: category ? category.name : 'Category',
            pageCss: 'viewcategory',
            category: category,
            posts: posts.map(post => ({
                id: post.post_id, // for the link
                title: post.title,
                contentPreview: post.content.substring(0, 200) + (post.content.length > 200 ? '...' : ''),
                author: post.user_id ? post.user_id.username : 'Unknown',
                date: post.created_at.toDateString()
            })),
            menuItems: menuItems
        })
    } catch (error) {
        console.error('Error fetching category posts:', error)
        res.render('viewcategory', {
            title: 'Category',
            pageCss: 'viewcategory',
            category: null,
            posts: [],
            menuItems: []
        })
    }
})

module.exports = router