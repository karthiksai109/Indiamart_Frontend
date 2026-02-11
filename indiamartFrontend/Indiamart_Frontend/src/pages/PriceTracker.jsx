import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, getPriceHistory, getAllProducts, addToWishlist } from '../api';
import './PriceTracker.css';

const PriceTracker = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [targetPrice, setTargetPrice] = useState('');
  const [notifyAdded, setNotifyAdded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllProducts();
        const list = res.products || res || [];
        setProducts(Array.isArray(list) ? list : []);
      } catch (e) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!productId) {
      setSelectedProduct(null);
      setPriceHistory([]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [prodRes, histRes] = await Promise.all([
          getProduct(productId),
          getPriceHistory(productId),
        ]);
        if (!cancelled && prodRes.product) setSelectedProduct(prodRes.product);
        if (!cancelled && histRes.history) setPriceHistory(histRes.history || []);
      } catch (e) {
        if (!cancelled) setSelectedProduct(null);
      }
    })();
    return () => { cancelled = true; };
  }, [productId]);

  const handleSelectProduct = (id) => {
    navigate(id ? `/price-tracker/${id}` : '/price-tracker');
  };

  const handleNotifyMe = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    if (!selectedProduct) return;
    try {
      const res = await addToWishlist(
        selectedProduct._id,
        true,
        targetPrice ? parseFloat(targetPrice) : undefined
      );
      if (res.status) setNotifyAdded(true);
    } catch (e) {
      alert('Could not add notification.');
    }
  };

  const currentPrice = selectedProduct?.price;
  const lowest = priceHistory.length
    ? Math.min(...priceHistory.map((h) => h.price))
    : currentPrice;
  const highest = priceHistory.length
    ? Math.max(...priceHistory.map((h) => h.price))
    : currentPrice;

  return (
    <div className="price-tracker-page">
      <div className="price-tracker-container">
        <h1>Price Tracker</h1>
        <p className="subtitle">Track prices and get notified when your favourite Indian products go on sale during festivals.</p>

        <div className="tracker-layout">
          <div className="product-picker">
            <h3>Select a product</h3>
            {loading ? (
              <p className="muted">Loading…</p>
            ) : (
              <ul className="product-picker-list">
                {products.map((p) => (
                  <li
                    key={p._id}
                    className={selectedProduct?._id === p._id ? 'active' : ''}
                    onClick={() => handleSelectProduct(p._id)}
                  >
                    <span>{p.name}</span>
                    <span className="price">₹{p.price?.toLocaleString('en-IN')}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="tracker-detail">
            {selectedProduct ? (
              <>
                <div className="tracker-product-header">
                  <img
                    src={selectedProduct.imageUrl || 'https://via.placeholder.com/120'}
                    alt={selectedProduct.name}
                  />
                  <div>
                    <h2>{selectedProduct.name}</h2>
                    <p className="current-price">Current: ₹{currentPrice?.toLocaleString('en-IN')}</p>
                    {priceHistory.length > 0 && (
                      <p className="range">
                        Lowest: ₹{lowest?.toLocaleString('en-IN')} · Highest: ₹{highest?.toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>
                </div>

                {priceHistory.length > 0 && (
                  <div className="history-section">
                    <h3>Price history</h3>
                    <ul className="history-list">
                      {priceHistory.slice(0, 30).map((h, i) => (
                        <li key={i}>
                          <span>₹{h.price.toLocaleString('en-IN')}</span>
                          <span className="date">{new Date(h.recordedAt).toLocaleDateString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="notify-section">
                  <h3>Notify on price drop (e.g. during festivals)</h3>
                  <p className="muted">We will email you when the price drops.</p>
                  <input
                    type="number"
                    placeholder="Target price (optional)"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="target-input"
                  />
                  <button type="button" className="btn-notify" onClick={handleNotifyMe}>
                    {notifyAdded ? '✓ You will be notified' : 'Notify me'}
                  </button>
                </div>
              </>
            ) : (
              <p className="muted">Select a product to see price history and set alerts.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTracker;
