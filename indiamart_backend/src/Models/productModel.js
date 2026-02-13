const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData' },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String },
    stock: { type: Number, required: true },
    ratings: [ratingSchema],
    avgRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
