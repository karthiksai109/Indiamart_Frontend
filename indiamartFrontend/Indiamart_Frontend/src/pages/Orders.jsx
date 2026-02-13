import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../api';
import './Orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    (async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.orders || []);
      } catch (e) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1>My Orders</h1>
        {loading ? (
          <p className="muted">Loading…</p>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <p>You have no orders yet.</p>
            <button type="button" className="btn-shop" onClick={() => navigate('/shop')}>
              Shop now
            </button>
          </div>
        ) : (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order._id} className="order-card">
                <div className="order-header">
                  <span className="order-id">Order #{order._id.slice(-8)}</span>
                  <span className={`order-status ${order.status}`}>{order.status}</span>
                </div>
                <p className="order-date">{new Date(order.createdAt).toLocaleString()}</p>
                <ul className="order-items">
                  {(order.items || []).map((item, i) => (
                    <li key={i}>
                      {item.name} × {item.quantity} – ${(item.price * item.quantity).toLocaleString('en-US')}
                    </li>
                  ))}
                </ul>
                <p className="order-total">Total: ${order.totalAmount?.toLocaleString('en-US')}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
