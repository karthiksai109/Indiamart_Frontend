const PriceHistory = require('../Models/priceHistoryModel');
const Product = require('../Models/productModel');
const mongoose = require('mongoose');

const getPriceHistory = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: 'Invalid productId' });
        }

        const history = await PriceHistory.find({ productId })
            .sort({ recordedAt: -1 })
            .limit(90);

        res.status(200).json({ status: true, history });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

const recordPrice = async (productId, price) => {
    try {
        await PriceHistory.create({ productId, price });
    } catch (e) {
        console.error('Record price error:', e.message);
    }
};

module.exports = { getPriceHistory, recordPrice };
