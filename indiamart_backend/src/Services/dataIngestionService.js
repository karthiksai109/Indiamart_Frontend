/**
 * Real-Time Data Ingestion Service
 * Simulates pulling unstructured product data from Azure Data Lake / Snowflake
 * and normalizing it into the IndiaMart product schema.
 *
 * In production, replace the mock fetchers with actual SDK calls:
 *   - @azure/storage-blob  for Azure Blob / Data Lake
 *   - snowflake-sdk         for Snowflake warehouse queries
 *
 * The pipeline:
 *   1. Pull raw (unstructured) records from external source
 *   2. Normalize / clean each record
 *   3. Upsert into MongoDB (update price if exists, insert if new)
 *   4. Record price history so the Price Tracker stays accurate
 *   5. Return a summary of what changed
 */

const Product = require('../Models/productModel');
const PriceHistory = require('../Models/priceHistoryModel');

// ─── Source Configurations ───────────────────────────────────────────
const DATA_SOURCES = {
  azure: {
    name: 'Azure Data Lake',
    type: 'azure_blob',
    // In production: connectionString, containerName, blobPrefix from env
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING || '',
    container: process.env.AZURE_CONTAINER_NAME || 'indiamart-products',
  },
  snowflake: {
    name: 'Snowflake Warehouse',
    type: 'snowflake',
    // In production: account, username, password, database, schema, warehouse from env
    account: process.env.SNOWFLAKE_ACCOUNT || '',
    username: process.env.SNOWFLAKE_USER || '',
    database: process.env.SNOWFLAKE_DB || 'INDIAMART_DB',
    schema: process.env.SNOWFLAKE_SCHEMA || 'PUBLIC',
    warehouse: process.env.SNOWFLAKE_WAREHOUSE || 'COMPUTE_WH',
  },
};

// ─── Mock: Simulate Azure Data Lake fetch ────────────────────────────
// Returns unstructured JSON blobs as they would come from a data lake
async function fetchFromAzure() {
  // In production:
  // const { BlobServiceClient } = require('@azure/storage-blob');
  // const client = BlobServiceClient.fromConnectionString(DATA_SOURCES.azure.connectionString);
  // ... iterate blobs, parse JSON/CSV ...

  return [
    {
      product_name: 'Basmati Rice Premium 5kg',
      product_category: 'Groceries',
      unit_price: 18.99,
      desc: 'Aged long-grain basmati rice from the foothills of the Himalayas. Perfect for biryani and pulao.',
      img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      available_qty: 150,
      tags: ['rice', 'basmati', 'organic', 'premium'],
      region: 'North India',
      supplier: 'Himalayan Grains Co.',
    },
    {
      product_name: 'Darjeeling First Flush Tea 250g',
      product_category: 'Beverages',
      unit_price: 24.50,
      desc: 'Hand-picked first flush Darjeeling tea leaves. The champagne of teas.',
      img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
      available_qty: 200,
      tags: ['tea', 'darjeeling', 'first-flush', 'premium'],
      region: 'East India',
      supplier: 'Darjeeling Tea Estate',
    },
    {
      product_name: 'Kashmiri Saffron 2g',
      product_category: 'Spices',
      unit_price: 32.00,
      desc: 'Pure Kashmiri Mongra saffron. Grade A quality for authentic Indian cooking.',
      img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
      available_qty: 80,
      tags: ['saffron', 'kashmiri', 'spice', 'premium'],
      region: 'Kashmir',
      supplier: 'Kashmir Spice Valley',
    },
    {
      product_name: 'Handloom Silk Saree',
      product_category: 'Clothing',
      unit_price: 89.99,
      desc: 'Traditional Kanchipuram handloom silk saree with gold zari border.',
      img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
      available_qty: 25,
      tags: ['saree', 'silk', 'handloom', 'traditional'],
      region: 'South India',
      supplier: 'Kanchipuram Weavers Coop',
    },
    {
      product_name: 'Brass Pooja Thali Set',
      product_category: 'Home & Pooja',
      unit_price: 34.99,
      desc: 'Hand-crafted brass pooja thali with diya, incense holder, and kumkum box.',
      img: 'https://images.unsplash.com/photo-1606293926249-ed22e446d476?w=400',
      available_qty: 60,
      tags: ['pooja', 'brass', 'handcrafted', 'traditional'],
      region: 'Rajasthan',
      supplier: 'Jaipur Brass Works',
    },
    {
      product_name: 'Alphonso Mango Pulp 850g',
      product_category: 'Groceries',
      unit_price: 8.99,
      desc: 'Premium Ratnagiri Alphonso mango pulp. No added sugar or preservatives.',
      img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
      available_qty: 300,
      tags: ['mango', 'alphonso', 'pulp', 'ratnagiri'],
      region: 'West India',
      supplier: 'Konkan Fruit Exports',
    },
    {
      product_name: 'Turmeric Powder Organic 500g',
      product_category: 'Spices',
      unit_price: 6.49,
      desc: 'Organic Lakadong turmeric from Meghalaya. Highest curcumin content.',
      img: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400',
      available_qty: 400,
      tags: ['turmeric', 'organic', 'lakadong', 'spice'],
      region: 'Northeast India',
      supplier: 'Meghalaya Organics',
    },
    {
      product_name: 'Kolhapuri Chappal Leather',
      product_category: 'Footwear',
      unit_price: 42.00,
      desc: 'Authentic hand-stitched Kolhapuri leather chappal. Vegetable-tanned.',
      img: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400',
      available_qty: 45,
      tags: ['chappal', 'kolhapuri', 'leather', 'handmade'],
      region: 'Maharashtra',
      supplier: 'Kolhapur Leather Artisans',
    },
    {
      product_name: 'Mysore Sandalwood Soap 3-Pack',
      product_category: 'Personal Care',
      unit_price: 12.99,
      desc: 'Classic Mysore sandalwood soap with pure sandalwood oil.',
      img: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400',
      available_qty: 500,
      tags: ['soap', 'sandalwood', 'mysore', 'natural'],
      region: 'Karnataka',
      supplier: 'Karnataka Soaps & Detergents',
    },
    {
      product_name: 'Assam CTC Tea 1kg',
      product_category: 'Beverages',
      unit_price: 14.99,
      desc: 'Strong Assam CTC tea. Perfect for masala chai.',
      img: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
      available_qty: 350,
      tags: ['tea', 'assam', 'ctc', 'chai'],
      region: 'Northeast India',
      supplier: 'Assam Tea Corporation',
    },
  ];
}

// ─── Mock: Simulate Snowflake warehouse query ────────────────────────
async function fetchFromSnowflake() {
  // In production:
  // const snowflake = require('snowflake-sdk');
  // const conn = snowflake.createConnection({ ...DATA_SOURCES.snowflake });
  // conn.connect() -> execute SQL -> return rows

  return [
    {
      PRODUCT_NAME: 'Kerala Coconut Oil Cold-Pressed 1L',
      CATEGORY: 'Groceries',
      PRICE_USD: 11.49,
      DESCRIPTION: 'Pure cold-pressed virgin coconut oil from Kerala. Unrefined and chemical-free.',
      IMAGE_URL: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400',
      STOCK_QTY: 220,
      METADATA: '{"region":"Kerala","supplier":"Kerala Coir Board","tags":["coconut","oil","cold-pressed"]}',
    },
    {
      PRODUCT_NAME: 'Madhubani Painting Frame',
      CATEGORY: 'Art & Decor',
      PRICE_USD: 55.00,
      DESCRIPTION: 'Hand-painted Madhubani art from Bihar. Natural dyes on handmade paper.',
      IMAGE_URL: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400',
      STOCK_QTY: 15,
      METADATA: '{"region":"Bihar","supplier":"Mithila Art Collective","tags":["art","madhubani","handpainted"]}',
    },
    {
      PRODUCT_NAME: 'Hyderabadi Biryani Masala 200g',
      CATEGORY: 'Spices',
      PRICE_USD: 5.99,
      DESCRIPTION: 'Authentic Hyderabadi biryani spice blend. Restaurant-grade quality.',
      IMAGE_URL: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
      STOCK_QTY: 600,
      METADATA: '{"region":"Telangana","supplier":"Deccan Spices","tags":["biryani","masala","hyderabadi"]}',
    },
    {
      PRODUCT_NAME: 'Pashmina Shawl Pure Wool',
      CATEGORY: 'Clothing',
      PRICE_USD: 120.00,
      DESCRIPTION: 'Genuine Kashmiri Pashmina shawl. Hand-woven from the finest Changthangi goat wool.',
      IMAGE_URL: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400',
      STOCK_QTY: 10,
      METADATA: '{"region":"Kashmir","supplier":"Kashmir Loom","tags":["pashmina","shawl","handwoven","luxury"]}',
    },
    {
      PRODUCT_NAME: 'Agarbatti Premium Incense 12-Pack',
      CATEGORY: 'Home & Pooja',
      PRICE_USD: 9.99,
      DESCRIPTION: 'Hand-rolled premium incense sticks. Sandalwood, rose, and jasmine fragrances.',
      IMAGE_URL: 'https://images.unsplash.com/photo-1602524206684-fdf1ff293831?w=400',
      STOCK_QTY: 800,
      METADATA: '{"region":"Karnataka","supplier":"Mysore Agarbatti Works","tags":["incense","agarbatti","pooja"]}',
    },
  ];
}

// ─── Normalizer: Convert unstructured records to our schema ──────────
function normalizeAzureRecord(raw) {
  return {
    name: (raw.product_name || raw.name || '').trim(),
    category: (raw.product_category || raw.category || 'General').trim(),
    price: parseFloat(raw.unit_price || raw.price || 0),
    description: (raw.desc || raw.description || '').trim(),
    imageUrl: (raw.img || raw.image_url || raw.imageUrl || '').trim(),
    stock: parseInt(raw.available_qty || raw.stock || 0, 10),
    _meta: {
      source: 'azure_data_lake',
      tags: raw.tags || [],
      region: raw.region || '',
      supplier: raw.supplier || '',
      ingestedAt: new Date(),
    },
  };
}

function normalizeSnowflakeRecord(raw) {
  let meta = {};
  try { meta = JSON.parse(raw.METADATA || '{}'); } catch { meta = {}; }

  return {
    name: (raw.PRODUCT_NAME || '').trim(),
    category: (raw.CATEGORY || 'General').trim(),
    price: parseFloat(raw.PRICE_USD || 0),
    description: (raw.DESCRIPTION || '').trim(),
    imageUrl: (raw.IMAGE_URL || '').trim(),
    stock: parseInt(raw.STOCK_QTY || 0, 10),
    _meta: {
      source: 'snowflake_warehouse',
      tags: meta.tags || [],
      region: meta.region || '',
      supplier: meta.supplier || '',
      ingestedAt: new Date(),
    },
  };
}

// ─── Core: Upsert products into MongoDB ──────────────────────────────
async function upsertProducts(normalizedRecords) {
  const results = { inserted: 0, updated: 0, priceChanges: [], errors: [] };

  for (const record of normalizedRecords) {
    try {
      if (!record.name || record.price <= 0) {
        results.errors.push({ name: record.name, reason: 'Invalid name or price' });
        continue;
      }

      const existing = await Product.findOne({ name: record.name });

      if (existing) {
        const oldPrice = existing.price;
        let changed = false;

        if (record.price !== oldPrice) {
          existing.price = record.price;
          changed = true;
          results.priceChanges.push({
            name: record.name,
            oldPrice,
            newPrice: record.price,
            direction: record.price < oldPrice ? 'down' : 'up',
          });
        }

        if (record.description && record.description !== existing.description) {
          existing.description = record.description;
          changed = true;
        }
        if (record.imageUrl && record.imageUrl !== existing.imageUrl) {
          existing.imageUrl = record.imageUrl;
          changed = true;
        }
        if (record.stock !== existing.stock) {
          existing.stock = record.stock;
          changed = true;
        }

        if (changed) {
          await existing.save();
          await PriceHistory.create({ productId: existing._id, price: existing.price });
          results.updated++;
        }
      } else {
        const newProduct = new Product({
          name: record.name,
          category: record.category,
          price: record.price,
          description: record.description,
          imageUrl: record.imageUrl,
          stock: record.stock,
        });
        await newProduct.save();
        await PriceHistory.create({ productId: newProduct._id, price: newProduct.price });
        results.inserted++;
      }
    } catch (err) {
      results.errors.push({ name: record.name, reason: err.message });
    }
  }

  return results;
}

// ─── Public: Run full ingestion pipeline ─────────────────────────────
async function runIngestionPipeline(source = 'all') {
  const summary = {
    source,
    startedAt: new Date(),
    azure: null,
    snowflake: null,
    totalInserted: 0,
    totalUpdated: 0,
    totalPriceChanges: [],
    errors: [],
  };

  try {
    if (source === 'all' || source === 'azure') {
      const rawAzure = await fetchFromAzure();
      const normalized = rawAzure.map(normalizeAzureRecord);
      summary.azure = await upsertProducts(normalized);
      summary.totalInserted += summary.azure.inserted;
      summary.totalUpdated += summary.azure.updated;
      summary.totalPriceChanges.push(...summary.azure.priceChanges);
      summary.errors.push(...summary.azure.errors);
    }

    if (source === 'all' || source === 'snowflake') {
      const rawSnowflake = await fetchFromSnowflake();
      const normalized = rawSnowflake.map(normalizeSnowflakeRecord);
      summary.snowflake = await upsertProducts(normalized);
      summary.totalInserted += summary.snowflake.inserted;
      summary.totalUpdated += summary.snowflake.updated;
      summary.totalPriceChanges.push(...summary.snowflake.priceChanges);
      summary.errors.push(...summary.snowflake.errors);
    }
  } catch (err) {
    summary.errors.push({ name: 'pipeline', reason: err.message });
  }

  summary.completedAt = new Date();
  summary.durationMs = summary.completedAt - summary.startedAt;

  return summary;
}

// ─── Public: Get real-time product feed (SSE-compatible) ─────────────
async function getProductFeed() {
  const products = await Product.find().sort({ updatedAt: -1 }).limit(50).lean();
  return {
    timestamp: new Date(),
    count: products.length,
    products,
  };
}

module.exports = {
  runIngestionPipeline,
  getProductFeed,
  DATA_SOURCES,
  fetchFromAzure,
  fetchFromSnowflake,
};
