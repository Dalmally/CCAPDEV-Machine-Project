const mongoose = require('mongoose');
const Category = require('./model/Category');
require('dotenv').config();

async function seedCategories() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const categories = [
            { id: 1, name: 'Android', parentCategory: 'Electronic Schemas' },
            { id: 2, name: 'iPhone', parentCategory: 'Electronic Schemas' },
            { id: 3, name: 'iPad', parentCategory: 'Electronic Schemas' },
            { id: 4, name: 'Xbox', parentCategory: 'Electronic Schemas' },
            { id: 5, name: 'Playstation', parentCategory: 'Electronic Schemas' },
            { id: 6, name: 'Console', parentCategory: 'Hardware Repair & Teardown' },
            { id: 7, name: 'Android', parentCategory: 'Hardware Repair & Teardown' },
            { id: 8, name: 'Apple', parentCategory: 'Hardware Repair & Teardown' },
            { id: 9, name: 'Nintendo', parentCategory: 'Hardware Repair & Teardown' },
            { id: 10, name: 'General Electronics', parentCategory: 'Hardware Repair & Teardown' },
            { id: 11, name: 'Console', parentCategory: 'Firmware Mods' },
            { id: 12, name: 'Android', parentCategory: 'Firmware Mods' },
            { id: 13, name: 'Nintendo', parentCategory: 'Firmware Mods' },
            { id: 14, name: 'General Electronics', parentCategory: 'Firmware Mods' },
            { id: 15, name: 'Android', parentCategory: 'Mobile Development' },
            { id: 16, name: 'iOS / iPadOS', parentCategory: 'Mobile Development' },
            { id: 17, name: 'iOS', parentCategory: 'Sideloading' },
            { id: 18, name: 'iPadOS', parentCategory: 'Sideloading' }
        ];

        for (const cat of categories) {
            await Category.findOneAndUpdate({ id: cat.id }, cat, { upsert: true });
        }

        console.log('Categories seeded successfully');
    } catch (error) {
        console.error('Error seeding categories:', error);
    } finally {
        mongoose.connection.close();
    }
}

seedCategories();