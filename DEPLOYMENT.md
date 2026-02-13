# IndiaMart — Deployment Guide

Complete checklist to deploy the IndiaMart e-commerce application and ensure all features work perfectly in production.

---

## 1. Environment Variables

### Backend (`indiamart_backend/.env`)

```env
# Server
PORT=3000

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/MissionIndiaMart

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx

# Email (SMTP) — for order confirmations + price-drop notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=IndiaMart <your-email@gmail.com>

# Azure Data Lake (optional — for real-time product ingestion)
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=...
AZURE_CONTAINER_NAME=indiamart-products

# Snowflake (optional — for real-time product ingestion)
SNOWFLAKE_ACCOUNT=your-account
SNOWFLAKE_USER=your-user
SNOWFLAKE_DB=INDIAMART_DB
SNOWFLAKE_SCHEMA=PUBLIC
SNOWFLAKE_WAREHOUSE=COMPUTE_WH
```

### Frontend (`Indiamart_Frontend/.env`)

```env
VITE_API_BASE=https://your-backend-url.onrender.com
```

---

## 2. Email Configuration (Gmail)

To send order confirmations and price-drop emails via Gmail:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App Passwords** → Generate a new app password for "Mail"
4. Use that 16-character password as `SMTP_PASS`
5. Set `SMTP_USER` to your Gmail address

**Test email locally:**
```bash
curl -X POST http://localhost:3000/admin/send-price-drop-emails
```

---

## 3. Razorpay Setup

1. Create account at [razorpay.com](https://razorpay.com)
2. Go to **Settings → API Keys** → Generate Key
3. Copy `Key ID` → `RAZORPAY_KEY_ID`
4. Copy `Key Secret` → `RAZORPAY_KEY_SECRET`
5. If keys are missing, the app falls back to **demo mode** (order still gets created, email still sent)

---

## 4. MongoDB Setup

The app uses MongoDB Atlas. Ensure:

- Your cluster IP whitelist includes `0.0.0.0/0` (for cloud deployment)
- The connection string is correct in your `.env` or `index.js`
- Collections: `products`, `userdatas`, `orders`, `wishlists`, `pricehistories`

---

## 5. Data Ingestion (Azure / Snowflake)

The app includes a real-time data pipeline that pulls product data from external sources.

**Run ingestion manually:**
```bash
curl -X POST http://localhost:3000/admin/run-ingestion \
  -H "Content-Type: application/json" \
  -d '{"source": "all"}'
```

**Sources:** `"azure"`, `"snowflake"`, or `"all"`

In production, replace the mock fetchers in `src/Services/dataIngestionService.js` with actual SDK calls:
- `@azure/storage-blob` for Azure Data Lake
- `snowflake-sdk` for Snowflake warehouse

The frontend has a **Sync Data** button on the Shop page that triggers ingestion.

---

## 6. Backend Deployment (Render)

1. Push `indiamart_backend` to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node src/index.js`
   - **Environment:** Node
5. Add all environment variables from Section 1
6. Deploy

---

## 7. Frontend Deployment (Netlify / Vercel)

1. Push `Indiamart_Frontend` to GitHub
2. Create a new site on [Netlify](https://netlify.com) or [Vercel](https://vercel.com)
3. Settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
   - **Framework:** Vite
4. Add environment variable: `VITE_API_BASE=https://your-backend.onrender.com`
5. Add a `_redirects` file in `public/` folder:
   ```
   /*    /index.html   200
   ```
6. Deploy

---

## 8. Feature Checklist

Before going live, verify each feature:

| Feature | How to Test |
|---------|-------------|
| **User Registration/Login** | Register → Login → Check JWT in localStorage |
| **Product Listing** | Visit `/shop` → Products load from DB |
| **Voice Search** | Click mic icon on Shop page → Speak a product name |
| **Category Filters** | Click category pills → Products filter correctly |
| **Sort** | Use sort dropdown → Price/Rating/Newest sorting works |
| **Wishlist (Like)** | Click heart on product → Fills red → Persists on reload |
| **Wishlist Toggle** | Click filled heart → Removes from wishlist |
| **Add to Cart** | Click "Add to Cart" → Cart count updates in navbar |
| **Cart Quantity** | Use +/- buttons → Price updates → Remove with trash icon |
| **Payment (Razorpay)** | Proceed to Pay → Razorpay modal opens (or demo mode) |
| **Order Confirmation Email** | After payment → Check email for confirmation |
| **Order History** | Visit `/orders` → Past orders display |
| **Price Tracker** | Visit `/price-tracker` → Select product → View history |
| **Price Drop Email** | Trigger via `/admin/send-price-drop-emails` |
| **Budget Planner** | Enter budget on Home → Get plan suggestions → Add to cart |
| **Data Sync** | Click "Sync Data" on Shop → New products appear |
| **Recently Viewed** | Click products → Recently viewed strip appears |
| **Share Product** | Click share arrow → Copies link or opens share sheet |
| **Product Ratings** | Rate via API → Stars display on product cards |
| **Mobile Responsive** | Resize browser → Hamburger menu, responsive grid |
| **Real-Time Feed** | `GET /feed/products` returns latest products |

---

## 9. API Endpoints Reference

### Public
- `GET /products` — All products
- `GET /product/:id` — Single product
- `GET /product/:id/price-history` — Price history
- `GET /product/:id/ratings` — Product ratings
- `GET /feed/products` — Real-time product feed
- `GET /feed/products/stream` — SSE live stream

### Authenticated (Bearer token)
- `POST /order/create` — Create order
- `GET /order/my-orders` — User's orders
- `POST /payment/create-order` — Razorpay order
- `POST /payment/verify` — Verify payment
- `POST /order/:id/send-confirmation` — Send order email
- `POST /wishlist/add` — Add to wishlist
- `DELETE /wishlist/:productId` — Remove from wishlist
- `GET /wishlist` — Get wishlist
- `POST /product/:id/rate` — Rate product

### Admin
- `POST /admin/run-ingestion` — Run data pipeline
- `POST /admin/send-price-drop-emails` — Trigger price-drop emails

---

## 10. Troubleshooting

| Issue | Fix |
|-------|-----|
| Payment fails | Check `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`. App falls back to demo mode if missing. |
| Emails not sending | Verify `SMTP_USER` and `SMTP_PASS`. Use Gmail App Password, not regular password. |
| Products not loading | Check MongoDB connection. Run ingestion to seed products. |
| CORS errors | Backend has `cors()` middleware. Ensure frontend `VITE_API_BASE` matches backend URL exactly. |
| Wishlist not persisting | User must be logged in. Check JWT token in localStorage. |
| Build fails | Run `npm install` first. Check for missing dependencies. |

---

## 11. Tech Stack

- **Frontend:** React 18, Vite, React Router v7, Framer Motion, Lucide Icons
- **Backend:** Express.js, Mongoose, JWT, Razorpay SDK, Nodemailer
- **Database:** MongoDB Atlas
- **Payment:** Razorpay (with demo fallback)
- **Email:** Nodemailer + Gmail SMTP
- **Data Pipeline:** Azure Data Lake / Snowflake (mock + production-ready)
- **Deployment:** Render (backend) + Netlify/Vercel (frontend)
