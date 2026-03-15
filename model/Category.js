const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        min: 1
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    parentCategory: {
        type: String,
        required: true,
        enum: [
            'Electronic Schemas',
            'Hardware Repair & Teardown', 
            'Firmware Mods',
            'Mobile Development',
            'Sideloading'
        ]
    }
}, {
    timestamps: false // Disable createdAt and updatedAt fields
});
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;