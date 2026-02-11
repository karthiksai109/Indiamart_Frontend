const mongoose = require('mongoose');

const priceHistorySchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    price: { type: Number, required: true },
    recordedAt: { type: Date, default: Date.now },
}, { timestamps: true });

priceHistorySchema.index({ productId: 1, recordedAt: -1 });

module.exports = mongoose.model('PriceHistory', priceHistorySchema);
