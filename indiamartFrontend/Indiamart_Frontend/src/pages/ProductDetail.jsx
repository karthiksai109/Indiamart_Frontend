import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, getPriceHistory, addToWishlist } from '../api';
import './ProductDetail.css';

const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [prodRes, histRes] = await Promise.all([
          getProduct(productId),
          getPriceHistory(productId),
        ]);
        if (!cancelled && prodRes.product) setProduct(prodRes.product);
        if (!cancelled && histRes.history) setPriceHistory(histRes.history);
      } catch (e) {
        if (!cancelled) setProduct(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) addToCart(product);
    navigate('/cart');
  };

  const handleWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const res = await addToWishlist(product._id, true);
      if (res.status) setWishlisted(true);
    } catch (e) {
      alert('Could not add to wishlist.');
    }
  };

  if (loading) return <div className="product-detail-page"><p className="loading-msg">Loading…</p></div>;
  if (!product) return <div className="product-detail-page"><p className="loading-msg">Product not found.</p></div>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-layout">
        <div className="product-detail-image-wrap">
          <img src={product.imageUrl || 'https://via.placeholder.com/400'} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-desc">{product.description || 'Indian essential.'}</p>
          <p className="product-price">${product.price.toLocaleString('en-US')}</p>
          <div className="quantity-row">
            <label>Quantity:</label>
            <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>
          <div className="product-detail-actions">
            <button type="button" className="btn-add-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button type="button" className="btn-wishlist" onClick={handleWishlist}>
              {wishlisted ? '✓ In Wishlist' : 'Add to Wishlist (Notify on price drop)'}
            </button>
          </div>
          {priceHistory.length > 0 && (
            <div className="price-history-block">
              <h3>Price history</h3>
              <ul>
                {priceHistory.slice(0, 7).map((h, i) => (
                  <li key={i}>
                    ${h.price.toLocaleString('en-US')} – {new Date(h.recordedAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
              <button type="button" className="link-btn" onClick={() => navigate(`/price-tracker/${productId}`)}>
                View full price tracker
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
