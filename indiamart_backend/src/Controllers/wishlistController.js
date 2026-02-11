const Wishlist = require('../Models/wishlistModel');
const mongoose = require('mongoose');

const addToWishlist = async (req, res) => {
    try {
        const userId = req.token;
        const { productId, notifyOnPriceDrop, targetPrice } = req.body;

        if (!productId || !mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: 'Valid productId is required' });
        }

        let wish = await Wishlist.findOne({ userId, productId });
        if (wish) {
            wish.notifyOnPriceDrop = notifyOnPriceDrop !== false;
            wish.targetPrice = targetPrice;
            await wish.save();
            return res.status(200).json({ status: true, wishlist: wish, message: 'Wishlist updated' });
        }

        const wishlist = new Wishlist({
            userId,
            productId,
            notifyOnPriceDrop: notifyOnPriceDrop !== false,
            targetPrice: targetPrice || undefined,
        });
        await wishlist.save();

        res.status(201).json({ status: true, wishlist, message: 'Added to wishlist' });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.token;
        const { productId } = req.params;

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: 'Invalid productId' });
        }

        const deleted = await Wishlist.findOneAndDelete({ userId, productId });
        if (!deleted) return res.status(404).json({ message: 'Item not in wishlist' });

        res.status(200).json({ status: true, message: 'Removed from wishlist' });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

const getWishlist = async (req, res) => {
    try {
        const userId = req.token;
        const list = await Wishlist.find({ userId }).populate('productId');
        res.status(200).json({ status: true, wishlist: list });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
