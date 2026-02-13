import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  })();

  const go = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <nav className="navbar-app">
      <div className="navbar-brand" onClick={() => go('/')}>
        IndiaMart
      </div>

      <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
        <span className="nav-link" onClick={() => go('/')}>Home</span>
        <span className="nav-link" onClick={() => go('/shop')}>Shop</span>
        <span className="nav-link" onClick={() => go('/price-tracker')}>Price Tracker</span>
        <span className="nav-link" onClick={() => go('/wishlist')}>Wishlist</span>
        <span className="nav-link" onClick={() => go('/orders')}>Orders</span>

        <div className="mobile-nav-actions">
          {user ? (
            <>
              <span className="mobile-user" onClick={() => go('/UserDetails')}>
                {user.name}
              </span>
              <button
                type="button"
                className="btn-auth"
                onClick={() => {
                  localStorage.clear();
                  go('/');
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button type="button" className="btn-auth" onClick={() => go('/login')}>
              Login
            </button>
          )}
        </div>
      </div>

      <div className="navbar-actions">
        <button
          type="button"
          className="btn-cart-nav"
          onClick={() => navigate('/cart')}
        >
          <ShoppingCart size={18} />
          <span>Cart</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
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
        <button
          type="button"
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
