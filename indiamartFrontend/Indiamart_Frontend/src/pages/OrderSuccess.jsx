import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="order-success-page">
      <div className="order-success-card">
        <div className="success-icon">✓</div>
        <h1>Thank you for your order</h1>
        <p>Your order has been placed successfully.</p>
        {orderId && <p className="order-id">Order ID: {orderId}</p>}
        <div className="order-success-actions">
          <button type="button" className="btn-primary" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/orders')}>
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
