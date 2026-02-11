import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, createPaymentOrder, verifyPayment } from '../api';
import { API_BASE } from '../config';
import './Cart.css';

const Cart = ({ cartItems: propCart, deleteFromCart }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const stored = (() => {
      try {
        const c = JSON.parse(localStorage.getItem('cart'));
        return Array.isArray(c) ? c : [];
      } catch {
        return [];
      }
    })();
    setCartItems(propCart !== undefined ? propCart : stored);
  }, [propCart]);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleQuantity = (item, delta) => {
    const q = (item.quantity || 1) + delta;
    if (q < 1) {
      if (deleteFromCart) deleteFromCart(item._id, item.quantity || 1);
      return;
    }
    const updated = cartItems.map((i) =>
      i._id === item._id ? { ...i, quantity: q } : i
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleRemove = (item) => {
    if (deleteFromCart) deleteFromCart(item._id, item.quantity || 1);
    const updated = cartItems.filter((i) => i._id !== item._id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handlePayment = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      alert('Please login to place your order.');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setLoading(true);
    try {
      const address = ''; // could be from profile
      const orderRes = await createOrder(
        cartItems.map((i) => ({ _id: i._id, productId: i._id, quantity: i.quantity || 1 })),
        totalAmount,
        address
      );

      if (!orderRes.status || !orderRes.order) {
        alert(orderRes.message || 'Failed to create order.');
        setLoading(false);
        return;
      }

      const backendOrderId = orderRes.order._id;
      setOrderId(backendOrderId);

      const payRes = await createPaymentOrder(totalAmount, backendOrderId);

      if (payRes.demoMode || !payRes.orderId) {
        await verifyPayment({
          razorpay_order_id: 'demo',
          razorpay_payment_id: 'demo',
          razorpay_signature: 'demo',
          orderId: backendOrderId,
        });
        await fetch(`${API_BASE}/user/${userId}/updateOrders`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem('cart');
        setCartItems([]);
        setLoading(false);
        window.dispatchEvent(new Event('cartUpdated'));
        navigate('/order-success', { state: { orderId: backendOrderId } });
        return;
      }

      const options = {
        key: payRes.keyId,
        amount: payRes.amount,
        currency: payRes.currency || 'INR',
        name: 'IndiaMart',
        description: 'Indian Essentials',
        order_id: payRes.orderId,
        handler: async function (response) {
          const verifyRes = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: backendOrderId,
          });
          if (verifyRes.status) {
            await fetch(`${API_BASE}/user/${userId}/updateOrders`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            });
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdated'));
            navigate('/order-success', { state: { orderId: backendOrderId } });
          } else {
            alert('Payment verification failed.');
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => {
        alert('Payment failed. Please try again.');
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      alert(err.message || 'Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <button type="button" className="btn-shop" onClick={() => navigate('/shop')}>
              Shop Indian Essentials
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item._id} className="cart-item">
                  <div className="item-details">
                    <img
                      src={item.imageUrl || 'https://via.placeholder.com/80'}
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-info">
                      <strong>{item.name}</strong>
                      <span className="item-price">₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="cart-actions">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => handleQuantity(item, -1)}
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity || 1}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => handleQuantity(item, 1)}
                      aria-label="Increase"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <strong>Total: ₹{totalAmount.toLocaleString('en-IN')}</strong>
            </div>
            <button
              type="button"
              className="make-payment"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? 'Processing…' : 'Proceed to Pay'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
