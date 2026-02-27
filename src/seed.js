const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const Product = require('./models/Product');
const mongoose = require('mongoose');

dotenv.config();

const products = [
    {
        name: 'iPhone 15',
        price: 80000,
        stock: 5
    },
    {
        name: 'MacBook Air',
        price: 90000,
        stock: 10
    },
    {
        name: 'AirPods Pro',
        price: 25000,
        stock: 20
    }
];

const seedDB = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB for seeding');

        await Product.deleteMany();
        console.log('Existing products cleared');

        await Product.insertMany(products);
        console.log('Sample products seeded');

        await mongoose.connection.close();
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
