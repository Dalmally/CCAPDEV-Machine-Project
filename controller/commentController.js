const Comment = require('../model/Comment')
const Post = require('../model/Post')
const User = require('../model/User')

exports.addComment = async (req, res) => {
    try {
        console.log('addComment called');
        const { post_id, content } = req.body
        console.log('req.body:', req.body);
        const postId = parseInt(post_id)
        console.log('postId:', postId);

        // Assume current user is the first user
        console.log('Finding current user...');
        const currentUser = await User.findOne().sort({ user_id: 1 })
        console.log('currentUser:', currentUser);
        if (!currentUser) {
            console.log('No users found');
            return res.status(400).send('No users found')
        }

        console.log('Creating new comment...');
        const newComment = new Comment({
            post_id: postId,
            user_id: currentUser.user_id,
            content: content
        })
        console.log('newComment:', newComment);

        console.log('Saving comment...');
        await newComment.save()
        console.log('Comment saved successfully');

        res.redirect(`/post/${postId}`)
    } catch (error) {
        console.error('Error adding comment:', error)
        res.status(500).send('Error adding comment')
    }
}

exports.getComments = async (req, res) => {
    try {
        const { post_id } = req.params
        const postId = parseInt(post_id)
        const comments = await Comment.find({ post_id: postId }).sort({ created_at: 1 }).populate({ path: 'user_id', model: 'User', foreignField: 'user_id', select: 'username' })
        res.json(comments)
    } catch (error) {
        console.error('Error getting comments:', error)
        res.status(500).json({ error: 'Error fetching comments' })
    }
}