const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./Models/productModel');
const PriceHistory = require('./Models/priceHistoryModel');

const indianProducts = [
    { name: 'Basmati Rice 1kg', category: 'Groceries', price: 89, description: 'Premium Indian basmati rice', imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', stock: 100 },
    { name: 'Turmeric Powder 200g', category: 'Spices', price: 65, description: 'Pure haldi powder', imageUrl: 'https://images.unsplash.com/photo-1596040033229-a0b2c939c58f?w=400', stock: 80 },
    { name: 'Garam Masala 100g', category: 'Spices', price: 120, description: 'Authentic Indian spice blend', imageUrl: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=400', stock: 60 },
    { name: 'Pure Ghee 500ml', category: 'Groceries', price: 349, description: 'Desi cow ghee', imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400', stock: 50 },
    { name: 'Cotton Saree', category: 'Traditional Wear', price: 1299, description: 'Handwoven cotton saree', imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', stock: 30 },
    { name: 'Kurti Women', category: 'Traditional Wear', price: 599, description: 'Comfortable cotton kurti', imageUrl: 'https://images.unsplash.com/photo-1595776613215-fe04b78de7d0?w=400', stock: 45 },
    { name: 'Brass Diya Set', category: 'Home', price: 199, description: 'Set of 5 brass diyas', imageUrl: 'https://images.unsplash.com/photo-1602874801006-4e411e9b5f2a?w=400', stock: 70 },
    { name: 'Stainless Steel Kadai', category: 'Kitchen', price: 449, description: 'Indian cooking kadai', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', stock: 40 },
    { name: 'Chai Masala 50g', category: 'Beverages', price: 55, description: 'Indian tea masala', imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400', stock: 90 },
    { name: 'Jaggery 500g', category: 'Groceries', price: 75, description: 'Organic Indian jaggery', imageUrl: 'https://images.unsplash.com/photo-1608797178972-2a21559e6992?w=400', stock: 85 },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://group21Database:f8HsIED1oiOyc6yi@karthikcluster.b2ikjot.mongodb.net/MissionIndiaMart");
        const existing = await Product.countDocuments();
        if (existing > 0) {
            console.log('Products already exist. Skipping seed.');
            process.exit(0);
            return;
        }
        for (const p of indianProducts) {
            const product = await Product.create(p);
            await PriceHistory.create({ productId: product._id, price: product.price });
        }
        console.log('Seeded', indianProducts.length, 'Indian products.');
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

seed();
