import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const navigate = useNavigate();
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  })();

  return (
    <nav className="navbar-app">
      <div className="navbar-brand" onClick={() => navigate('/')}>
        IndiaMart
      </div>
      <div className="navbar-links">
        <span className="nav-link" onClick={() => navigate('/')}>Home</span>
        <span className="nav-link" onClick={() => navigate('/shop')}>Shop</span>
        <span className="nav-link" onClick={() => navigate('/price-tracker')}>Price Tracker</span>
        <span className="nav-link" onClick={() => navigate('/wishlist')}>Wishlist</span>
        <span className="nav-link" onClick={() => navigate('/orders')}>Orders</span>
      </div>
      <div className="navbar-actions">
        <button
          type="button"
          className="btn-cart-nav"
          onClick={() => navigate('/cart')}
        >
          Cart {cartCount > 0 ? `(${cartCount})` : ''}
        </button>
        {user ? (
          <>
            <span className="user-name" onClick={() => navigate('/UserDetails')}>
              {user.name}
            </span>
            <button
              type="button"
              className="btn-auth"
              onClick={() => {
                localStorage.clear();
                navigate('/');
                window.location.reload();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button type="button" className="btn-auth" onClick={() => navigate('/login')}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
