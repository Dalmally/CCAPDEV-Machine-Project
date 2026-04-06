const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    admin_id: {
        type: Number,
        unique: true
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
    // References the user that has been granted admin privileges
    user_id: {
        type: Number,
        unique: true,
        ref: 'User'
    },
    role_level: {
        type: String,
        maxlength: 50,
        default: 'moderator',
        enum: ['moderator', 'admin', 'superadmin']
    },
    assigned_at: {
        type: Date,
        default: Date.now
    }
});

// Auto-increment admin_id before saving
adminSchema.pre('save', async function () {
    if (this.isNew) {
        const lastAdmin = await mongoose.model('Admin').findOne().sort({ admin_id: -1 });
        this.admin_id = lastAdmin ? lastAdmin.admin_id + 1 : 1;
    }
});

module.exports = mongoose.model('Admin', adminSchema);
