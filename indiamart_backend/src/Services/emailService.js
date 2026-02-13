const nodemailer = require('nodemailer');
const userModel = require('../Models/userModel');
const Wishlist = require('../Models/wishlistModel');
const Product = require('../Models/productModel');
const PriceHistory = require('../Models/priceHistoryModel');
const Order = require('../Models/orderModel');

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

// ─── Price Drop Notification Emails ──────────────────────────────────
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

        const previous = await PriceHistory.find({ productId: product._id }).sort({ recordedAt: -1 }).skip(1).limit(1);
        const oldPrice = previous[0] ? previous[0].price : product.price;
        const currentPrice = product.price;
        if (currentPrice >= oldPrice) continue;
        if (w.targetPrice && currentPrice > w.targetPrice) continue;

        const savings = (oldPrice - currentPrice).toFixed(2);
        const pct = ((1 - currentPrice / oldPrice) * 100).toFixed(0);
        const name = user.fname || 'Customer';
        const festivalNote = isFestivalPeriod()
            ? '<div style="background:#fff3e0;padding:12px 16px;border-radius:8px;margin:16px 0;font-weight:600;color:#e65100;">🎉 Festival Sale is LIVE — Extra savings on Indian essentials!</div>'
            : '';

        const html = `
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#e0e0e0;border-radius:16px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#d4af37,#e8872a);padding:28px 24px;text-align:center;">
              <h1 style="margin:0;color:#000;font-size:1.6rem;">IndiaMart</h1>
              <p style="margin:6px 0 0;color:#1a1a1a;font-size:0.9rem;">Price Drop Alert</p>
            </div>
            <div style="padding:28px 24px;">
              <p style="margin:0 0 16px;">Hi <strong>${name}</strong>,</p>
              <p style="margin:0 0 8px;">Great news! A product on your wishlist just dropped in price:</p>
              <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:20px;margin:16px 0;">
                <h3 style="margin:0 0 8px;color:#d4af37;">${product.name}</h3>
                <p style="margin:0;font-size:1.3rem;">
                  <span style="text-decoration:line-through;color:#888;">$${oldPrice.toFixed(2)}</span>
                  &nbsp;&rarr;&nbsp;
                  <span style="color:#4caf50;font-weight:700;">$${currentPrice.toFixed(2)}</span>
                </p>
                <p style="margin:8px 0 0;color:#4caf50;font-size:0.9rem;">You save $${savings} (${pct}% off)</p>
              </div>
              ${festivalNote}
              <p style="margin:16px 0 0;color:#999;font-size:0.85rem;">Shop now at IndiaMart — Indian essentials at the best prices.</p>
            </div>
          </div>
        `;

        try {
            await transporter.sendMail({
                from: process.env.SMTP_FROM || process.env.SMTP_USER,
                to: user.email,
                subject: `IndiaMart: ${product.name} dropped to $${currentPrice.toFixed(2)} (${pct}% off!)`,
                html,
            });
            sent.push(user.email);
        } catch (e) {
            console.error('Send mail error:', e.message);
        }
    }

    return { sent: sent.length };
};

// ─── Order Confirmation + Thank You Email ────────────────────────────
const sendOrderConfirmationEmail = async (orderId) => {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log('Email not configured. Skipping order confirmation.');
        return { sent: false, reason: 'SMTP not configured' };
    }

    try {
        const order = await Order.findById(orderId);
        if (!order) return { sent: false, reason: 'Order not found' };

        const user = await userModel.findById(order.userId);
        if (!user || !user.email) return { sent: false, reason: 'User or email not found' };

        const name = user.fname || 'Customer';
        const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        const itemsHtml = (order.items || []).map(item => `
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #2a2a2a;">
              ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}" style="width:48px;height:48px;border-radius:8px;object-fit:cover;vertical-align:middle;margin-right:10px;" />` : ''}
              <span style="color:#e0e0e0;">${item.name}</span>
            </td>
            <td style="padding:10px 12px;border-bottom:1px solid #2a2a2a;text-align:center;color:#ccc;">${item.quantity}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #2a2a2a;text-align:right;color:#d4af37;font-weight:600;">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `).join('');

        const html = `
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#e0e0e0;border-radius:16px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#d4af37,#e8872a);padding:32px 24px;text-align:center;">
              <h1 style="margin:0;color:#000;font-size:1.8rem;">IndiaMart</h1>
              <p style="margin:8px 0 0;color:#1a1a1a;font-size:1rem;">Order Confirmed ✓</p>
            </div>
            <div style="padding:32px 24px;">
              <h2 style="margin:0 0 8px;color:#4caf50;">Thank you for your order, ${name}!</h2>
              <p style="margin:0 0 20px;color:#999;">Your payment has been received and your order is being processed.</p>

              <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:20px;margin:0 0 20px;">
                <table style="width:100%;font-size:0.9rem;">
                  <tr>
                    <td style="color:#999;padding:4px 0;">Order ID</td>
                    <td style="text-align:right;color:#d4af37;font-weight:600;">#${order._id.toString().slice(-8).toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td style="color:#999;padding:4px 0;">Date</td>
                    <td style="text-align:right;color:#e0e0e0;">${orderDate}</td>
                  </tr>
                  <tr>
                    <td style="color:#999;padding:4px 0;">Status</td>
                    <td style="text-align:right;"><span style="background:#4caf50;color:#fff;padding:3px 10px;border-radius:999px;font-size:0.8rem;">Paid</span></td>
                  </tr>
                </table>
              </div>

              <h3 style="margin:0 0 12px;color:#d4af37;">Items Ordered</h3>
              <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
                <thead>
                  <tr style="border-bottom:2px solid #333;">
                    <th style="text-align:left;padding:8px 12px;color:#999;">Product</th>
                    <th style="text-align:center;padding:8px 12px;color:#999;">Qty</th>
                    <th style="text-align:right;padding:8px 12px;color:#999;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding:14px 12px;text-align:right;font-weight:700;color:#e0e0e0;font-size:1rem;">Total</td>
                    <td style="padding:14px 12px;text-align:right;font-weight:700;color:#d4af37;font-size:1.1rem;">$${order.totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>

              ${order.address ? `<p style="margin:20px 0 0;color:#999;font-size:0.85rem;">Shipping to: ${order.address}</p>` : ''}

              <div style="margin:28px 0 0;padding:20px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;text-align:center;">
                <p style="margin:0 0 8px;font-size:1rem;color:#e0e0e0;">🙏 Thank you for shopping with IndiaMart!</p>
                <p style="margin:0;font-size:0.85rem;color:#999;">Bringing authentic Indian products to your doorstep.</p>
              </div>
            </div>
            <div style="background:#111;padding:16px 24px;text-align:center;font-size:0.8rem;color:#666;">
              © ${new Date().getFullYear()} IndiaMart. All rights reserved.
            </div>
          </div>
        `;

        await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: user.email,
            subject: `IndiaMart: Order Confirmed #${order._id.toString().slice(-8).toUpperCase()} — Thank you, ${name}!`,
            html,
        });

        return { sent: true, email: user.email };
    } catch (err) {
        console.error('Order confirmation email error:', err.message);
        return { sent: false, reason: err.message };
    }
};

module.exports = { sendPriceDropEmails, sendOrderConfirmationEmail, isFestivalPeriod };
