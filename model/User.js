const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 255
    },
    bio: {
        type: String,
        default: ''
    },
    avatar_url: {
        type: String,
        maxlength: 255,
        default: '/default-avatar.jpg'
    },
    badge: {
        type: String,
        maxlength: 50,
        default: ''
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Auto-increment user_id before saving
userSchema.pre('save', async function () {
    if (this.isNew) {
        const lastUser = await mongoose.model('User').findOne().sort({ user_id: -1 });
        this.user_id = lastUser ? lastUser.user_id + 1 : 1;
    }
});

module.exports = mongoose.model('User', userSchema);
