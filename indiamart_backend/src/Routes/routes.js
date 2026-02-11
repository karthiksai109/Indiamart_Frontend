const express = require('express');
const { default: mongoose } = require("mongoose");

const userModel = require("../Models/userModel");
const router = express.Router();
const Product = require('../Models/productModel');
const Cart = require('../Models/cartModel');
const { registerUser, getUser, updateUsers, login, updateOrders } = require('../Controllers/userController');
const { isAuthentication } = require('../Middlewares/commonMiddleware');
const { createOrder, getMyOrders, updateOrderPayment } = require('../Controllers/orderController');
const { addToWishlist, removeFromWishlist, getWishlist } = require('../Controllers/wishlistController');
const { getPriceHistory } = require('../Controllers/priceHistoryController');
const { recordPrice } = require('../Controllers/priceHistoryController');
const { createPaymentOrder, verifyPayment } = require('../Controllers/paymentController');
const { sendPriceDropEmails } = require('../Services/emailService');

//=======APIs for User=========
router.post("/register",  registerUser);
router.post("/login", login);
router.get('/user/:userId/profile', isAuthentication, getUser);
router.put('/user/:userId/updateOrders',isAuthentication, updateOrders)
router.put('/user/:userId/profile', isAuthentication, updateUsers);

//==========API for Products======
var user=[]
router.post('/padd', async (req, res) => {
    try {
        const { name, category, price, description, imageUrl, stock } = req.body;

        if (!name || !category || !price || !stock) {
            return res.status(400).json({ message: 'All required fields must be filled' });
        }

        const newProduct = new Product({ name, category, price, description, imageUrl, stock });
        await newProduct.save();
        await recordPrice(newProduct._id, newProduct.price);
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
});

// Search Products
router.get('/products', async (req, res) => {
    try {
        const { name, category } = req.query;
        const query = {};

        if (name) query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        if (category) query.category = { $regex: category, $options: 'i' };

        const products = await Product.find(query);
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Error searching products', error: error.message });
    }
});

// View All Products
router.get('/allp', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
});

// Get single product (for product detail & price tracker)
router.get('/product/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
});



//==================================API for cart=================================


// Add Product to Cart
router.post('/cadd', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: 'User ID, Product ID, and Quantity are required' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the product is already in the user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (existingProductIndex >= 0) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to cart', error: error.message });
    }
});



// View Cart (use /cart/:userId to avoid conflict with other routes)
router.get('/cart/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return res.status(200).json({ cart: { products: [] } });
        }
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error: error.message });
    }
});




// Set Budget
router.post('/user/:userId/budget', isAuthentication, async (req, res) => {
    try {
        const { userId } = req.params;
        const { budget } = req.body;

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userId !== req.token) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        user.budget = budget;
        await user.save();

        res.status(200).json({ message: "Budget updated successfully", budget: user.budget });
    } catch (error) {
        res.status(500).json({ message: "Error updating budget", error: error.message });
    }
});

// Get Budget
router.get('/user/:userId/budget', isAuthentication, async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userId !== req.token) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        res.status(200).json({ budget: user.budget });
    } catch (error) {
        res.status(500).json({ message: "Error fetching budget", error: error.message });
    }
});


router.get('/user/:userId/cart/check-budget', isAuthentication, async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userId !== req.token) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const cartTotal = cart.products.reduce((total, product) => {
            return total + product.quantity * product.productId.price;
        }, 0);

        if (cartTotal > user.budget) {
            return res.status(400).json({ message: "Cart total exceeds budget", cartTotal, budget: user.budget });
        }

        res.status(200).json({ message: "Cart is within budget", cartTotal, budget: user.budget });
    } catch (error) {
        res.status(500).json({ message: "Error validating cart against budget", error: error.message });
    }
});
// router.post('/budget-check', async (req, res) => {
//     try {
//         const { budget, items } = req.body;

//         if (!budget || !Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ message: "Budget and item list are required" });
//         }

//         const products = await Product.find({ name: { $in: items } });
//         const availableItems = [];
//         const missingItems = [];
//         let totalCost = 0;

//         items.forEach(item => {
//             const product = products.find(p => p.name.toLowerCase() === item.toLowerCase());
//             if (product) {
//                 if (totalCost + product.price <= budget) {
//                     availableItems.push(product);
//                     totalCost += product.price;
//                 }
//             } else {
//                 missingItems.push(item);
//             }
//         });

//         res.status(200).json({
//             availableItems,
//             missingItems,
//             totalCost,
//             budget,
//             withinBudget: totalCost <= budget
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Error checking budget", error: error.message });
//     }
// });

router.post('/user/:userId/budget-plan', async (req, res) => {
    try {
      const { budget } = req.body;
      const products = await Product.find(); // assume Product is your model
  
      // sort by price ascending
      products.sort((a, b) => a.price - b.price);
  
      const generatePlans = () => {
        const plans = [];
  
        // Plan 1: Max items within budget
        let plan1 = [], sum1 = 0;
        for (const p of products) {
          if (sum1 + p.price <= budget) {
            plan1.push(p);
            sum1 += p.price;
          }
        }
        plans.push(plan1);
  
        // Plan 2: Items with highest value close to budget
        let bestPlan = [];
        const n = products.length;
        for (let i = 0; i < (1 << n); i++) {
          let plan = [], total = 0;
          for (let j = 0; j < n; j++) {
            if (i & (1 << j)) {
              if (total + products[j].price <= budget) {
                total += products[j].price;
                plan.push(products[j]);
              }
            }
          }
          if (total > bestPlan.reduce((s, p) => s + p.price, 0)) {
            bestPlan = plan;
          }
        }
        plans.push(bestPlan);
  
        // Plan 3: Add your own logic e.g. by category balance
  
        return plans;
      };
  
      const resultPlans = generatePlans();
  
      res.status(200).json({ status: true, plans: resultPlans });
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  });

// ========== Orders ==========
router.post('/order/create', isAuthentication, createOrder);
router.get('/order/my-orders', isAuthentication, getMyOrders);
router.put('/order/:orderId/payment', isAuthentication, updateOrderPayment);

// ========== Payment (Razorpay) ==========
router.post('/payment/create-order', isAuthentication, createPaymentOrder);
router.post('/payment/verify', isAuthentication, verifyPayment);

// ========== Wishlist ==========
router.post('/wishlist/add', isAuthentication, addToWishlist);
router.delete('/wishlist/:productId', isAuthentication, removeFromWishlist);
router.get('/wishlist', isAuthentication, getWishlist);

// ========== Price history (for price tracker) ==========
router.get('/product/:productId/price-history', getPriceHistory);
router.post('/product/:productId/record-price', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await recordPrice(productId, product.price);
    res.status(200).json({ status: true, message: 'Price recorded' });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

// ========== Trigger price-drop emails (cron or manual) ==========
router.post('/admin/send-price-drop-emails', async (req, res) => {
  try {
    const result = await sendPriceDropEmails();
    res.status(200).json({ status: true, ...result });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

module.exports = router;