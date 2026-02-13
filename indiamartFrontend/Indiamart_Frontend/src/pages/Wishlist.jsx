import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWishlist, removeFromWishlist } from '../api';
import './Wishlist.css';

const Wishlist = ({ addToCart }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    (async () => {
      try {
        const res = await getWishlist();
        setList(res.wishlist || []);
      } catch (e) {
        setList([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const handleRemove = async (productId) => {
    try {
      const res = await removeFromWishlist(productId);
      if (res.status) setList((prev) => prev.filter((w) => w.productId?._id !== productId && w.productId !== productId));
    } catch (e) {
      alert('Could not remove.');
    }
  };

  const handleAddToCart = (product) => {
    if (addToCart) addToCart(product);
    navigate('/cart');
  };

  const productFromItem = (item) => item.productId && (item.productId._id ? item.productId : { _id: item.productId, ...item.productId });

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <h1>My Wishlist</h1>
        <p className="subtitle">Products you marked. We will email you when prices drop during festivals.</p>

        {loading ? (
          <p className="muted">Loading…</p>
        ) : list.length === 0 ? (
          <div className="wishlist-empty">
            <p>Your wishlist is empty.</p>
            <button type="button" className="btn-shop" onClick={() => navigate('/shop')}>
              Shop now
            </button>
          </div>
        ) : (
          <ul className="wishlist-grid">
            {list.map((item) => {
              const product = productFromItem(item);
              if (!product || !product._id) return null;
              return (
                <li key={product._id} className="wishlist-card">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/200'}
                    alt={product.name}
                  />
                  <div className="wishlist-card-body">
                    <h3>{product.name}</h3>
                    <p className="price">${product.price?.toLocaleString('en-US')}</p>
                    <div className="wishlist-actions">
                      <button type="button" className="btn-cart" onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </button>
                      <button type="button" className="btn-remove" onClick={() => handleRemove(product._id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
