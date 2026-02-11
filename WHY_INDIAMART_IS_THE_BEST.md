# Why IndiaMart Is the Best Indian E‑commerce App

## 1. **India-first**
- Curated **Indian items only** (groceries, spices, traditional wear, kitchen, home).
- Prices in **₹ (INR)** everywhere.
- Built for Indian users and festivals.

## 2. **Budget planning**
- **Budget tool** on the home page: enter your budget and get multiple plans (e.g. max items within budget, best value).
- Add a full plan to cart in one click and proceed to checkout.

## 3. **Price tracker**
- **Price tracker** page: select any product and see **price history**.
- **“Notify me”** for price drops; optional **target price**.
- Backend can send **emails when prices drop**, especially around **festival periods** (e.g. Republic Day, Holi, Independence Day, Diwali).

## 4. **Wishlist + price alerts**
- **Wishlist** with “notify on price drop” and optional target price.
- Same email service used for wishlisted items when prices go down during festivals.

## 5. **Payments**
- **Razorpay** integration for real payments (INR).
- **Demo mode** when Razorpay is not configured: order is created and marked paid so the full flow works without keys.

## 6. **Orders**
- **Order creation** with items, total, and status.
- **Order history** page for logged-in users.
- **Order success** page after payment with option to view orders or continue shopping.

## 7. **UX and design**
- **Custom theme**: gold (#d4af37) and coral (#ff6f61) on dark background – no generic “AI” palette.
- **Outfit** font from Google Fonts – consistent, modern typography.
- **Responsive** layout and clear navigation (Home, Shop, Price Tracker, Wishlist, Orders, Cart).

## 8. **Technical quality**
- **Single API base** (env-configurable) for all backend calls.
- **Auth** (JWT) for profile, orders, wishlist, budget, payment.
- **Cart** with quantity +/- and remove; syncs with navbar count; clears after payment and notifies app via custom event.
- **Product detail** page with price history snippet and links to full price tracker and wishlist.

## 9. **Backend features**
- **Order, Wishlist, PriceHistory** models and APIs.
- **Price recording** when products are added; optional route to record current price for tracker/emails.
- **Email service** (nodemailer) for price-drop alerts with festival-period awareness.
- **Seed script** for sample Indian products and initial price history.

## 10. **Ready for production**
- Backend uses **dotenv** for MongoDB, Razorpay, and SMTP.
- Frontend uses **VITE_API_URL** and **VITE_RAZORPAY_KEY_ID** for deployment.
- **Zero hardcoded credentials** in repo; `.env.example` documents required variables.

Together, this makes IndiaMart a **full e‑commerce app** focused on Indian products, with budget planning, price tracking, wishlist alerts, real payments, and a consistent, custom UI – all working end-to-end.
