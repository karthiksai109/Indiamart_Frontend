const Order = require('../Models/orderModel');
const userModel = require('../Models/userModel');
const mongoose = require('mongoose');

// Razorpay keys from env; if not set, we return a dummy for frontend to show "payment not configured"
const getRazorpayKey = () => process.env.RAZORPAY_KEY_ID || '';

const createPaymentOrder = async (req, res) => {
    try {
        const userId = req.token;
        const { amount, orderId: frontOrderId, currency = 'INR' } = req.body;

        const amountInPaise = Math.round((amount || 0) * 100);
        if (amountInPaise < 100) {
            return res.status(400).json({ message: 'Amount must be at least ₹1' });
        }

        const keyId = getRazorpayKey();
        if (!keyId) {
            return res.status(200).json({
                status: true,
                keyId: '',
                orderId: '',
                amount: amountInPaise,
                currency,
                message: 'Payment gateway not configured. Use demo mode.',
                demoMode: true,
            });
        }

        const Razorpay = require('razorpay');
        const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amountInPaise,
            currency,
            receipt: frontOrderId || `order_${Date.now()}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.status(200).json({
            status: true,
            keyId,
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
        });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const userId = req.token;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keySecret) {
            if (orderId) {
                const order = await Order.findOne({ _id: orderId, userId });
                if (order) {
                    order.status = 'paid';
                    order.paymentId = 'demo';
                    order.paymentOrderId = razorpay_order_id || 'demo';
                    await order.save();
                }
            }
            return res.status(200).json({ status: true, message: 'Payment verified (demo)' });
        }

        const crypto = require('crypto');
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expected = crypto.createHmac('sha256', keySecret).update(body).digest('hex');

        if (expected !== razorpay_signature) {
            return res.status(400).json({ status: false, message: 'Invalid signature' });
        }

        if (orderId && mongoose.isValidObjectId(orderId)) {
            const order = await Order.findOne({ _id: orderId, userId });
            if (order) {
                order.status = 'paid';
                order.paymentId = razorpay_payment_id;
                order.paymentOrderId = razorpay_order_id;
                await order.save();
            }
        }

        res.status(200).json({ status: true, message: 'Payment verified' });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

module.exports = { createPaymentOrder, verifyPayment };
