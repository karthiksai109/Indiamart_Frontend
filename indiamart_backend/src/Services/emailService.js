const nodemailer = require('nodemailer');
const userModel = require('../Models/userModel');
const Wishlist = require('../Models/wishlistModel');
const Product = require('../Models/productModel');
const PriceHistory = require('../Models/priceHistoryModel');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const isFestivalPeriod = () => {
    const now = new Date();
    const m = now.getMonth();
    const d = now.getDate();
    const festivals = [
        [0, 26], [2, 8], [7, 15], [9, 2], [9, 20], [10, 12]
    ];
    return festivals.some(([month, day]) => m === month && Math.abs(d - day) <= 3);
};

const sendPriceDropEmails = async () => {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log('Email not configured. Skipping price drop emails.');
        return { sent: 0 };
    }

    const wishlists = await Wishlist.find({ notifyOnPriceDrop: true }).populate('productId');
    const sent = [];

    for (const w of wishlists) {
        if (!w.productId || !w.userId) continue;
        const product = w.productId;
        const user = await userModel.findById(w.userId);
        if (!user || !user.email) continue;

        const latest = await PriceHistory.findOne({ productId: product._id }).sort({ recordedAt: -1 });
        const previous = await PriceHistory.find({ productId: product._id }).sort({ recordedAt: -1 }).skip(1).limit(1);
        const oldPrice = previous[0] ? previous[0].price : product.price;
        const currentPrice = product.price;
        if (currentPrice >= oldPrice) continue;
        if (w.targetPrice && currentPrice > w.targetPrice) continue;

        const name = user.fname || 'Customer';
        const html = `
          <h2>Price drop on your wishlisted item!</h2>
          <p>Hi ${name},</p>
          <p><strong>${product.name}</strong> is now ₹${currentPrice} (was ₹${oldPrice}).</p>
          <p>Shop now at IndiaMart - Indian essentials at best prices.</p>
          <p>This notification was sent during our ${isFestivalPeriod() ? 'festival sale period' : 'regular price update'}.</p>
        `;

        try {
            await transporter.sendMail({
                from: process.env.SMTP_FROM || process.env.SMTP_USER,
                to: user.email,
                subject: `IndiaMart: Price drop on ${product.name}`,
                html,
            });
            sent.push(user.email);
        } catch (e) {
            console.error('Send mail error:', e.message);
        }
    }

    return { sent: sent.length };
};

module.exports = { sendPriceDropEmails, isFestivalPeriod };
