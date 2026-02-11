const Order = require('../Models/orderModel');
const Product = require('../Models/productModel');
const userModel = require('../Models/userModel');
const mongoose = require('mongoose');

const createOrder = async (req, res) => {
    try {
        const userId = req.token;
        const { items, totalAmount, address } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Items array is required' });
        }

        const orderItems = [];
        for (const item of items) {
            const id = item.productId || item._id;
            const product = await Product.findById(id);
            if (!product) continue;
            orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity || 1,
                imageUrl: product.imageUrl,
            });
        }

        const total = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const user = await userModel.findById(userId);

        const order = new Order({
            userId,
            items: orderItems,
            totalAmount: totalAmount || total,
            address: address || (user && user.address) || '',
            status: 'pending',
        });
        await order.save();

        res.status(201).json({ status: true, order, message: 'Order created' });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const userId = req.token;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ status: true, orders });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

const updateOrderPayment = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { paymentId, paymentOrderId } = req.body;

        if (!mongoose.isValidObjectId(orderId)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }

        const order = await Order.findOne({ _id: orderId, userId: req.token });
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.paymentId = paymentId || order.paymentId;
        order.paymentOrderId = paymentOrderId || order.paymentOrderId;
        order.status = 'paid';
        await order.save();

        res.status(200).json({ status: true, order });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

module.exports = { createOrder, getMyOrders, updateOrderPayment };
