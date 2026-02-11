import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './Home/Home';
import Register from './register/register';
import Login from './Login/login';
import UserDetails from './UserDetails/UserDetails';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import PriceTracker from './pages/PriceTracker';
import Wishlist from './pages/Wishlist';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(Array.isArray(stored) ? stored : []);
    } catch {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    const sync = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(Array.isArray(stored) ? stored : []);
      } catch {
        setCart([]);
      }
    };
    window.addEventListener('storage', sync);
    window.addEventListener('cartUpdated', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('cartUpdated', sync);
    };
  }, []);

  const addToCart = (product) => {
    const updated = [...cart];
    const match = updated.find((p) => p._id === product._id);
    if (match) match.quantity = (match.quantity || 1) + 1;
    else updated.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(updated));
    setCart(updated);
  };

  const deleteFromCart = (productId, quantity) => {
    const updated = cart
      .map((item) =>
        item._id === productId
          ? { ...item, quantity: (item.quantity || 1) - quantity }
          : item
      )
      .filter((item) => (item.quantity || 1) > 0);
    localStorage.setItem('cart', JSON.stringify(updated));
    setCart(updated);
  };

  return (
    <UserProvider>
      <Router>
        <Content
          cart={cart}
          addToCart={addToCart}
          deleteFromCart={deleteFromCart}
        />
      </Router>
    </UserProvider>
  );
}

function Content({ cart, addToCart, deleteFromCart }) {
  const location = useLocation();
  const hideNav =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/register';

  return (
    <div className="app-wrap">
      {!hideNav && (
        <Navbar cartCount={cart.reduce((total, item) => total + (item.quantity || 1), 0)} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/UserDetails" element={<UserDetails />} />
        <Route path="/shop" element={<ProductList addToCart={addToCart} />} />
        <Route path="/product/:productId" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cart} deleteFromCart={deleteFromCart} />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/price-tracker" element={<PriceTracker />} />
        <Route path="/price-tracker/:productId" element={<PriceTracker />} />
        <Route path="/wishlist" element={<Wishlist addToCart={addToCart} />} />
      </Routes>
    </div>
  );
}

export default App;
