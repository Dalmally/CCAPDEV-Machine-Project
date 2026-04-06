const User = require('../model/User');
const Post = require('../model/Post');
const Category = require('../model/Category');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

// Helper function to get menuItems for the sidebar/header
async function getMenuItems() {
    try {
        const categories = await Category.find().sort({ id: 1 });
        const menuItemsMap = {};
        categories.forEach(cat => {
            const parent = cat.parentCategory || "General";
            if (!menuItemsMap[parent]) menuItemsMap[parent] = [];
            menuItemsMap[parent].push({ id: cat.id, name: cat.name });
        });
        return Object.keys(menuItemsMap).map(parent => ({
            parent: parent,
            subcategories: menuItemsMap[parent]
        }));
    } catch (err) {
        console.error("Error fetching menu items:", err);
        return [];
    }
}

const profileController = {
    // 1. GET Profile Page
    getProfile: async (req, res) => {
        try {
            const { username } = req.params;
            const user = await User.findOne({ username: username });

            if (!user) {
                const menuItems = await getMenuItems();
                return res.status(404).render('profile', { 
                    title: 'User Not Found', 
                    user: null, 
                    menuItems 
                });
            }

            // Check if the logged-in user owns this profile
            const isOwnProfile = req.session.user && req.session.user.username === user.username;

            // Fetch user's posts
            const posts = await Post.find({ user_id: user.user_id }).sort({ created_at: -1 });
            
            const formattedPosts = posts.map(post => ({
                title: post.title,
                contentPreview: post.content.substring(0, 200) + (post.content.length > 200 ? '...' : ''),
                date: post.created_at.toDateString(),
                post_id: post.post_id
            }));

            const menuItems = await getMenuItems();
            res.render('profile', {
                title: user.username,
                pageCss: 'profile',
                isOwnProfile,
                user: {
                    username: user.username,
                    bio: user.bio || 'No bio',
                    badge: user.badge,
                    avatar_url: user.avatar_url || '/default-avatar.jpg',
                    posts: formattedPosts,
                    postCount: posts.length
                },
                menuItems
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
            const menuItems = await getMenuItems();
            res.status(500).render('profile', { title: 'Error', user: null, menuItems });
        }
    },

    // 2. SHOW Edit Form
    showEditProfile: async (req, res) => {
        if (!req.session.user) return res.redirect('/login');
        
        try {
            const user = await User.findOne({ username: req.session.user.username });
            const posts = await Post.find({ user_id: user.user_id }).sort({ created_at: -1 });
            const menuItems = await getMenuItems();
            
            // Format posts for the "My Posts" section in the edit view
            const formattedPosts = posts.map(post => ({
                title: post.title,
                contentPreview: post.content.substring(0, 200) + (post.content.length > 200 ? '...' : ''),
                date: post.created_at.toDateString(),
                post_id: post.post_id
            }));

            res.render('editprofile', {
                title: 'Edit Profile',
                pageCss: 'profile',
                user: user,
                posts: formattedPosts,
                menuItems
            });
        } catch (error) {
            console.error('Error loading edit page:', error);
            res.redirect('/profile/' + req.session.user.username);
        }
    },

    // 3. PROCESS Profile Update 
    updateProfile: [
        upload.single('avatar'), 
        async (req, res) => {
            if (!req.session.user) return res.status(401).send("Unauthorized");

            try {
                const { bio, username } = req.body;
                const oldUsername = req.session.user.username;

        
                const updatedUser = await User.findOneAndUpdate(
                    { username: oldUsername },
                    { $set: { bio: bio, username: username } },
                    { new: true }
                );

                
                req.session.user.username = updatedUser.username;

                res.redirect(`/profile/${updatedUser.username}`);
            } catch (error) {
                console.error('Error updating profile:', error);
                res.redirect('/profile/edit');
            }
        }
    ]
};

module.exports = profileController;