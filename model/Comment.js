const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment_id: {
        type: Number,
        unique: true
    },
    post_id: {
        type: Number,
        required: true,
        ref: 'Post'
    },
    user_id: {
        type: Number,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Auto-increment comment_id before saving
commentSchema.pre('save', async function () {
    if (this.isNew) {
        const lastComment = await mongoose.model('Comment').findOne().sort({ comment_id: -1 });
        this.comment_id = lastComment ? lastComment.comment_id + 1 : 1;
    }
});

module.exports = mongoose.model('Comment', commentSchema);
