const Comment = require('../model/Comment')
const Post = require('../model/Post')
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

//This will mainly add and get posts from the database

//Adds a post into the database
exports.addPost = async (req, res) => {
    try {
        const { title, content, category_id } = req.body

        // Assume current user is the first user
        const currentUser = await User.findOne().sort({ user_id: 1 })
        if (!currentUser) {
            return res.status(400).send('No users found')
        }

        const newPost = new Post({
            user_id: currentUser.user_id,
            category_id: category_id,
            title: title,
            content: content
        })

        await newPost.save()

        res.redirect('/home')
    } catch (error) {
        console.error('Error adding post:', error)
        res.status(500).send('Error creating post')
    }
}

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ created_at: -1 }).populate({ path: 'user_id', model: 'User', foreignField: 'user_id', select: 'username' })
        res.json(posts)
    } catch (error) {
        console.error('Error getting posts:', error)
        res.status(500).json({ error: 'Error fetching posts' })
    }
}

exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params
        const postId = parseInt(id)
        const post = await Post.findOne({ post_id: postId }).populate({ path: 'user_id', model: 'User', foreignField: 'user_id', select: 'username' }).lean()
        if (!post) {
            return res.status(404).send('Post not found')
        }
        const comments = await Comment.find({ post_id: postId }).sort({ created_at: 1 }).populate({ path: 'user_id', model: 'User', foreignField: 'user_id', select: 'username' }).lean()
        const category = await Category.findOne({ id: post.category_id })
        let menuItems = []
        try {
            menuItems = await getMenuItems()
        } catch (error) {
            console.error('Error fetching menuItems:', error)
        }
        res.render('viewpost', {
            title: post.title,
            pageCss: 'viewpost',
            post: post,
            comments: comments,
            category: category ? category.name : 'Unknown',
            menuItems: menuItems
        })
    } catch (error) {
        console.error('Error getting post:', error)
        res.status(500).send('Error fetching post')
    }
}