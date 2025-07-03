import React, { useState, useEffect } from 'react';
import './Home.css';
import BudgetTool from "../components/BudgetTool";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [budget, setBudget] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [token, setToken] = useState('');
    const[orders,setOrders]=useState('')

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const tokenFromStorage = localStorage.getItem('token');
        const orders=localStorage.getItem('orders')

        if (user) {
            setUserName(user.name);
            setToken(tokenFromStorage);
            setOrders(orders)

            if (!tokenFromStorage && user.token) {
                localStorage.setItem('token', user.token);
                setToken(user.token);
            }

            if (user._id) {
                localStorage.setItem('userId', user._id);
            }
        }
    }, []);

    const products = [
        { id: 1, name: 'Traditional Clothes', image: './img1.jpg' },
        { id: 2, name: 'Indian Foods', image: './img2.jpg' },
        { id: 3, name: 'Kitchenware', image: './img3.jpg' },
        { id: 4, name: 'Indian Meat', image: './img4.jpg' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('orders');
        setUserName('');
        navigate('/login');
    };

    return (
        <div className="home-container">
            <div className="nav-links">
                <button onClick={() => navigate('/')} className="nav-item">Home</button>
                <button onClick={() => navigate('/login')} className="nav-item">Login</button>
                <button onClick={() => navigate('/register')} className="nav-item">Register</button>
            </div>
            <nav className="nav-bar">
                <div className="logo">IndiaMart</div>
                <div className="user-actions">
                    <a href="#" className="nav-item">Home</a>
                    <a href="#budget-planning" className="nav-item">Budget Tool</a>
                    <a href="#products" className="nav-item">Products</a>
                    <a href="#about" className="nav-item">About Us</a>
                    <a href="#contact" className="nav-item">Contact</a>
                </div>
                <div className="nav-links">
                    {!userName ? (
                        <button onClick={() => navigate('/login')} className="nav-item">Login</button>
                    ) : (
                        <span
                            className="nav-item"
                            onClick={() => navigate('/UserDetails')}
                            style={{ cursor: 'pointer', color: '#007BFF' }}
                        >
                            Welcome, {userName}
                        </span>
                    )}
                </div>
                <div className="user-actions">
                    {!userName ? (
                        <button onClick={() => navigate('/login')} className="auth-button">Login</button>
                    ) : (
                        <button onClick={handleLogout} className="auth-button">Logout</button>
                    )}
                </div>
            </nav>

            <header className="hero-section">
                <h1>Welcome to IndiaMart</h1>
                <p>Your one-stop shop for Indian food, clothing, and more!</p>
                <button onClick={() => navigate('/shop')} className="shop-now-btn">Shop Now</button>
            </header>

            <section id="budget-planning" className="budget-planning-section">
                <BudgetTool token={token} />
            </section>

            <section id="products" className="product-section">
                <h2 className="product-section-header">Our Products</h2>
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <button onClick={() => navigate('/shop')} className="shop-now-btn">Discover More</button>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="footer">
                <p>© 2025 IndiaMart. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
