const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post_id: {
        type: Number,
        unique: true
    },
    user_id: {
        type: Number,
        required: true,
        ref: 'User'
    },
    category_id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0,
        min: 0
    },
    downvotes: {
        type: Number,
        default: 0,
        min: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Auto-increment post_id before saving
postSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastPost = await mongoose.model('Post').findOne().sort({ post_id: -1 });
        this.post_id = lastPost ? lastPost.post_id + 1 : 1;
    }
    next();
});

// Update updated_at on every save
postSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('Post', postSchema);
