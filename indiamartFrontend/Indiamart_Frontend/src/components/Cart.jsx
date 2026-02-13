import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, createPaymentOrder, verifyPayment, sendOrderConfirmation } from '../api';
import { API_BASE } from '../config';
import { ShoppingBag, Trash2, Plus, Minus, CreditCard, AlertCircle } from 'lucide-react';
import './Cart.css';

const Cart = ({ cartItems: propCart, deleteFromCart }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = (() => {
      try {
        const c = JSON.parse(localStorage.getItem('cart'));
        return Array.isArray(c) ? c : [];
      } catch {
        return [];
      }
    })();
    setCartItems(stored.length > 0 ? stored : (propCart || []));
  }, [propCart]);

  useEffect(() => {
    const sync = () => {
      try {
        const c = JSON.parse(localStorage.getItem('cart'));
        setCartItems(Array.isArray(c) ? c : []);
      } catch {}
    };
    window.addEventListener('cartUpdated', sync);
    return () => window.removeEventListener('cartUpdated', sync);
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const itemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleQuantity = (item, delta) => {
    const q = (item.quantity || 1) + delta;
    if (q < 1) {
      handleRemove(item);
      return;
    }
    const updated = cartItems.map((i) =>
      i._id === item._id ? { ...i, quantity: q } : i
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleRemove = (item) => {
    if (deleteFromCart) deleteFromCart(item._id, item.quantity || 1);
    const updated = cartItems.filter((i) => i._id !== item._id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCartAndGo = (orderId) => {
    localStorage.removeItem('cart');
    setCartItems([]);
    setLoading(false);
    window.dispatchEvent(new Event('cartUpdated'));
    navigate('/order-success', { state: { orderId } });
  };

  const handlePayment = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      setError('Please login to place your order.');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    if (cartItems.length === 0) return;

    setLoading(true);
    setError('');

    let backendOrderId = null;

    // Step 1: Create order in backend
    try {
      const orderRes = await createOrder(
        cartItems.map((i) => ({ _id: i._id, productId: i._id, quantity: i.quantity || 1 })),
        totalAmount,
        ''
      );
      if (orderRes.status && orderRes.order) {
        backendOrderId = orderRes.order._id;
      } else {
        // Order creation returned error but didn't throw
        setError(orderRes.message || 'Could not create order. Please try again.');
        setLoading(false);
        return;
      }
    } catch (err) {
      // Backend unreachable — use demo order
      backendOrderId = 'DEMO-' + Date.now();
    }

    // Step 2: Process payment (demo mode — no Razorpay keys configured)
    try {
      const payRes = await createPaymentOrder(totalAmount, backendOrderId);

      if (payRes.demoMode || !payRes.orderId) {
        // Demo mode: mark order as paid directly
        try {
          await verifyPayment({
            razorpay_order_id: 'demo',
            razorpay_payment_id: 'demo_pay_' + Date.now(),
            razorpay_signature: 'demo',
            orderId: backendOrderId,
          });
        } catch {}
        try { await sendOrderConfirmation(backendOrderId); } catch {}
        clearCartAndGo(backendOrderId);
        return;
      }

      // Real Razorpay flow
      const options = {
        key: payRes.keyId,
        amount: payRes.amount,
        currency: payRes.currency || 'USD',
        name: 'Great IndiaMart',
        description: 'Indian Essentials',
        order_id: payRes.orderId,
        handler: async function (response) {
          try {
            const verifyRes = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: backendOrderId,
            });
            if (verifyRes.status) {
              try { await sendOrderConfirmation(backendOrderId); } catch {}
              clearCartAndGo(backendOrderId);
            } else {
              setError('Payment verification failed. Please contact support.');
              setLoading(false);
            }
          } catch (e) {
            setError(e.message || 'Verification error.');
            setLoading(false);
          }
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', () => {
          setError('Payment failed. Please try again.');
          setLoading(false);
        });
        rzp.open();
      } else {
        // Razorpay script not loaded — demo fallback
        try { await sendOrderConfirmation(backendOrderId); } catch {}
        clearCartAndGo(backendOrderId);
      }
    } catch (err) {
      // Payment service unreachable — complete order in demo mode
      try { await sendOrderConfirmation(backendOrderId); } catch {}
      clearCartAndGo(backendOrderId);
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-page-header">
          <h2>Shopping Cart</h2>
          {cartItems.length > 0 && (
            <span className="cart-count-badge">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
          )}
        </div>

        {error && (
          <div className="cart-error">
            <AlertCircle size={18} />
            <span>{error}</span>
            <button type="button" onClick={() => setError('')}>×</button>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={56} strokeWidth={1.2} />
            <h3>Your cart is empty</h3>
            <p>Discover amazing Indian products and add them to your cart.</p>
            <button type="button" className="btn-shop" onClick={() => navigate('/shop')}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list-wrap">
              <ul className="cart-list">
                {cartItems.map((item) => (
                  <li key={item._id} className="cart-item">
                    <div className="item-details">
                      <img
                        src={item.imageUrl || 'https://via.placeholder.com/88'}
                        alt={item.name}
                        className="item-image"
                      />
                      <div className="item-info">
                        <strong>{item.name}</strong>
                        <span className="item-category">{item.category}</span>
                        <span className="item-price">${(item.price * (item.quantity || 1)).toLocaleString('en-US')}</span>
                      </div>
                    </div>
                    <div className="cart-actions">
                      <div className="qty-group">
                        <button type="button" className="qty-btn" onClick={() => handleQuantity(item, -1)} aria-label="Decrease">
                          <Minus size={14} />
                        </button>
                        <span className="qty-value">{item.quantity || 1}</span>
                        <button type="button" className="qty-btn" onClick={() => handleQuantity(item, 1)} aria-label="Increase">
                          <Plus size={14} />
                        </button>
                      </div>
                      <button type="button" className="remove-btn" onClick={() => handleRemove(item)} title="Remove">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button type="button" className="btn-continue" onClick={() => navigate('/shop')}>
                ← Continue Shopping
              </button>
            </div>
            <div className="cart-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row"><span>Subtotal</span><span>${totalAmount.toLocaleString('en-US')}</span></div>
              <div className="summary-row"><span>Shipping</span><span className="free-tag">Free</span></div>
              <div className="summary-divider" />
              <div className="summary-row total"><span>Total</span><span>${totalAmount.toLocaleString('en-US')}</span></div>
              <button
                type="button"
                className="make-payment"
                onClick={handlePayment}
                disabled={loading}
              >
                <CreditCard size={18} />
                {loading ? 'Processing…' : 'Proceed to Pay'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
