const User = require('../model/User')

const profileController = {
    getProfile: async (res, req) => {
        try {
            const { username } = req.params;

            const user = await User.findOne({
                username: username
            })

            if (!user) {
                return res.status(404).send('404: User Not Found')
            }

            const posts = await Post.find({
                user_id: user.user_id
            })

            const formattedPosts = posts.map({
                title: post.title,
                content: post.content,
                date:post.createdAt,
                post_id: post.post_id
            })

            res.render('profile', {
                title: user.username,
                user: {
                    username: user.username,
                    bio: user.bio || 'No bio',
                    badge: user.badge,
                    avatar_url: user.avatar_url || '/public/default-avatar.jpg',
                    posts: formattedPosts,
                    postCount: posts.length
                }
            })
        } catch {
            console.error('Error fetching profile', error)
            res.status(500).send('An error occurred while loading profile.')
        }
    }
}

module.exports = profileController;