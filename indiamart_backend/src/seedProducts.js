const mongoose = require('mongoose');
const Product = require('./Models/productModel');

const MONGO_URI = 'mongodb+srv://group21Database:f8HsIED1oiOyc6yi@karthikcluster.b2ikjot.mongodb.net/MissionIndiaMart';

const products = [
  // ── Food & Spices ──
  {
    name: 'Basmati Rice Premium (5kg)',
    category: 'Food',
    price: 12.99,
    description: 'Aged long-grain basmati rice from the foothills of the Himalayas. Perfect for biryani and pulao.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    stock: 200,
    avgRating: 4.8,
    reviewCount: 142
  },
  {
    name: 'Organic Turmeric Powder',
    category: 'Spices',
    price: 6.49,
    description: 'Pure organic turmeric from Kerala. Rich in curcumin with deep golden color.',
    imageUrl: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop',
    stock: 350,
    avgRating: 4.7,
    reviewCount: 89
  },
  {
    name: 'Garam Masala Blend',
    category: 'Spices',
    price: 7.99,
    description: 'Traditional 12-spice garam masala blend. Hand-roasted and freshly ground.',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop',
    stock: 280,
    avgRating: 4.6,
    reviewCount: 67
  },
  {
    name: 'Alphonso Mango Pulp (850g)',
    category: 'Food',
    price: 8.99,
    description: 'Premium Ratnagiri Alphonso mango pulp. Sweet, rich, and perfect for desserts and lassi.',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop',
    stock: 150,
    avgRating: 4.9,
    reviewCount: 203
  },
  {
    name: 'Darjeeling First Flush Tea',
    category: 'Beverages',
    price: 14.99,
    description: 'Single-estate Darjeeling first flush. Light, floral, and muscatel notes.',
    imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop',
    stock: 120,
    avgRating: 4.5,
    reviewCount: 56
  },
  {
    name: 'Ghee Pure Desi (1L)',
    category: 'Food',
    price: 15.99,
    description: 'Traditional slow-cooked A2 cow ghee. Rich aroma, golden texture.',
    imageUrl: 'https://images.unsplash.com/photo-1631209121750-a9f656d38f28?w=400&h=400&fit=crop',
    stock: 180,
    avgRating: 4.8,
    reviewCount: 178
  },
  {
    name: 'Chickpea Flour (Besan) 2kg',
    category: 'Food',
    price: 5.49,
    description: 'Stone-ground chickpea flour for pakoras, ladoo, and kadhi.',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop',
    stock: 300,
    avgRating: 4.4,
    reviewCount: 45
  },
  {
    name: 'Masala Chai Kit',
    category: 'Beverages',
    price: 11.99,
    description: 'Complete masala chai kit with Assam CTC tea, cardamom, ginger, cinnamon, and cloves.',
    imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop',
    stock: 200,
    avgRating: 4.7,
    reviewCount: 134
  },
  // ── Clothing ──
  {
    name: 'Silk Kurta (Men)',
    category: 'Clothing',
    price: 45.99,
    description: 'Handwoven Banarasi silk kurta. Perfect for festivals and celebrations.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
    stock: 60,
    avgRating: 4.6,
    reviewCount: 38
  },
  {
    name: 'Cotton Saree (Handloom)',
    category: 'Clothing',
    price: 39.99,
    description: 'Authentic South Indian handloom cotton saree with gold zari border.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
    stock: 45,
    avgRating: 4.8,
    reviewCount: 92
  },
  {
    name: 'Pashmina Shawl',
    category: 'Clothing',
    price: 89.99,
    description: 'Genuine Kashmiri pashmina shawl. Ultra-soft, hand-embroidered.',
    imageUrl: 'https://images.unsplash.com/photo-1601244005535-a48d21d951ac?w=400&h=400&fit=crop',
    stock: 25,
    avgRating: 4.9,
    reviewCount: 67
  },
  {
    name: 'Embroidered Salwar Kameez',
    category: 'Clothing',
    price: 34.99,
    description: 'Lucknowi chikankari embroidered salwar kameez set. Elegant and breathable.',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop',
    stock: 55,
    avgRating: 4.5,
    reviewCount: 41
  },
  // ── Kitchen & Home ──
  {
    name: 'Brass Diya Set (6 pcs)',
    category: 'Home',
    price: 18.99,
    description: 'Traditional brass oil lamps for Diwali and daily puja. Handcrafted in Moradabad.',
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop',
    stock: 100,
    avgRating: 4.7,
    reviewCount: 88
  },
  {
    name: 'Cast Iron Tawa (12 inch)',
    category: 'Kitchen',
    price: 24.99,
    description: 'Pre-seasoned cast iron tawa for perfect rotis and dosas. Lasts generations.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    stock: 80,
    avgRating: 4.6,
    reviewCount: 73
  },
  {
    name: 'Copper Water Bottle (1L)',
    category: 'Kitchen',
    price: 19.99,
    description: 'Pure copper water bottle for Ayurvedic health benefits. Leak-proof design.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    stock: 150,
    avgRating: 4.5,
    reviewCount: 112
  },
  {
    name: 'Stainless Steel Masala Box',
    category: 'Kitchen',
    price: 16.99,
    description: '7-compartment spice box with individual lids. Essential for every Indian kitchen.',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop',
    stock: 130,
    avgRating: 4.4,
    reviewCount: 59
  },
  // ── Wellness & Beauty ──
  {
    name: 'Ayurvedic Hair Oil (200ml)',
    category: 'Wellness',
    price: 9.99,
    description: 'Bhringraj and amla infused hair oil. Promotes growth and prevents hair fall.',
    imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    stock: 200,
    avgRating: 4.3,
    reviewCount: 87
  },
  {
    name: 'Sandalwood Incense Sticks (100 pcs)',
    category: 'Wellness',
    price: 7.49,
    description: 'Hand-rolled Mysore sandalwood agarbatti. Calming fragrance for meditation.',
    imageUrl: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400&h=400&fit=crop',
    stock: 250,
    avgRating: 4.6,
    reviewCount: 94
  },
  {
    name: 'Neem Face Wash',
    category: 'Wellness',
    price: 8.49,
    description: 'Natural neem and tulsi face wash. Antibacterial, gentle on skin.',
    imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
    stock: 180,
    avgRating: 4.2,
    reviewCount: 63
  },
  // ── Snacks ──
  {
    name: 'Haldiram Namkeen Variety Pack',
    category: 'Snacks',
    price: 10.99,
    description: 'Assorted Indian snacks — bhujia, mixture, sev, and aloo bhujia.',
    imageUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop',
    stock: 200,
    avgRating: 4.5,
    reviewCount: 156
  },
  {
    name: 'Kaju Katli (500g)',
    category: 'Sweets',
    price: 16.99,
    description: 'Premium cashew fudge. Silver-leaf coated, melt-in-mouth texture.',
    imageUrl: 'https://images.unsplash.com/photo-1666190077619-601a5c498280?w=400&h=400&fit=crop',
    stock: 100,
    avgRating: 4.8,
    reviewCount: 189
  },
  {
    name: 'Gulab Jamun Mix',
    category: 'Sweets',
    price: 5.99,
    description: 'Instant gulab jamun mix. Make perfect soft dumplings in sugar syrup at home.',
    imageUrl: 'https://images.unsplash.com/photo-1666190077619-601a5c498280?w=400&h=400&fit=crop',
    stock: 220,
    avgRating: 4.4,
    reviewCount: 78
  },
  {
    name: 'Papad (Lijjat) 200g',
    category: 'Snacks',
    price: 3.99,
    description: 'Crispy urad dal papad. Roast or fry for the perfect side dish.',
    imageUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop',
    stock: 300,
    avgRating: 4.3,
    reviewCount: 45
  },
  // ── Meat & Non-Veg ──
  {
    name: 'Chicken Tikka Masala Kit',
    category: 'Meat',
    price: 13.99,
    description: 'Complete cooking kit with marination spices, gravy base, and recipe card.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop',
    stock: 90,
    avgRating: 4.7,
    reviewCount: 112
  },
  {
    name: 'Lamb Biryani Spice Mix',
    category: 'Meat',
    price: 8.99,
    description: 'Hyderabadi-style biryani masala. Authentic blend for the perfect dum biryani.',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=400&fit=crop',
    stock: 110,
    avgRating: 4.6,
    reviewCount: 87
  },
  {
    name: 'Fish Curry Powder',
    category: 'Meat',
    price: 6.99,
    description: 'Kerala-style fish curry masala. Tangy, spicy, and aromatic.',
    imageUrl: 'https://images.unsplash.com/photo-1626508035297-5afab2d281b8?w=400&h=400&fit=crop',
    stock: 140,
    avgRating: 4.5,
    reviewCount: 54
  },
  // ── Festival & Puja ──
  {
    name: 'Puja Thali Set (Complete)',
    category: 'Festival',
    price: 29.99,
    description: 'Complete brass puja thali with bell, diya, incense holder, kumkum box, and kalash.',
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop',
    stock: 70,
    avgRating: 4.8,
    reviewCount: 96
  },
  {
    name: 'Rangoli Color Powder Set',
    category: 'Festival',
    price: 12.99,
    description: '10-color rangoli powder set with stencils. Non-toxic, vibrant colors for Diwali.',
    imageUrl: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=400&h=400&fit=crop',
    stock: 85,
    avgRating: 4.4,
    reviewCount: 62
  },
  {
    name: 'Diwali Gift Hamper',
    category: 'Festival',
    price: 49.99,
    description: 'Premium gift box with dry fruits, sweets, diyas, and greeting card.',
    imageUrl: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=400&h=400&fit=crop',
    stock: 40,
    avgRating: 4.9,
    reviewCount: 134
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const inserted = await Product.insertMany(products);
    console.log(`Seeded ${inserted.length} products with images`);

    await mongoose.disconnect();
    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seed();
