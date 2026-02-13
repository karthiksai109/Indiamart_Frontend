import React, { useEffect, useState } from "react";
import "./Home.css";
import BudgetTool from "../components/BudgetTool";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import {
  Utensils,
  Shirt,
  ShoppingBasket,
  DollarSign
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (user) {
      setUserName(user.name);
      setToken(storedToken || user.token);
      localStorage.setItem("userId", user._id);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserName("");
    navigate("/login");
  };

  const products = [
    { id: 1, name: "Traditional Clothes", image: "./img1.jpg" },
    { id: 2, name: "Indian Foods", image: "./img2.jpg" },
    { id: 3, name: "Kitchenware", image: "./img3.jpg" },
    { id: 4, name: "Indian Meat", image: "./img4.jpg" },
  ];

  // Premium floating animation
  const floatAnim = {
    initial: { y: 0, opacity: 0.8 },
    animate: {
      y: [-12, 12, -12],
      opacity: [0.7, 1, 0.7],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="home-container">

      {/* ================= NAVBAR ================= */}
      <nav className="nav-bar">
        <div className="logo">Great IndiaMart</div>

        <div className="nav-links">
          <span className="nav-item" onClick={() => navigate("/")}>Home</span>
          <span className="nav-item" onClick={() => navigate("/shop")}>Products</span>
          <span className="nav-item" onClick={() => navigate("/#budget")}>Budget Tool</span>
          <span className="nav-item" onClick={() => navigate("/price-tracker")}>Price Tracker</span>
          <span className="nav-item" onClick={() => navigate("/wishlist")}>Wishlist</span>
        </div>

        <div className="user-actions">
          {!userName ? (
            <button className="auth-button" onClick={() => navigate("/login")}>
              Login
            </button>
          ) : (
            <>
              <span
                className="nav-item"
                onClick={() => navigate("/UserDetails")}
              >
                Welcome, {userName}
              </span>
              <button className="auth-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="hero">

        {/* LEFT: CONTENT */}
        <div className="hero-content">
          <h1>
            Experience <br /> Great IndiaMart
          </h1>

          <p>
            Curated Indian essentials — from traditional flavors
            to everyday comforts, delivered with care.
          </p>

          <button
            className="btn-primary"
            onClick={() => navigate("/shop")}
          >
            Explore Products
          </button>
        </div>

        {/* RIGHT: PREMIUM ORB */}
        <div className="hero-orb-premium">

          {/* Core orb */}
          <div className="orb-core" />

          {/* Floating category icons */}
          <motion.div className="orb-icon food" {...floatAnim}>
            <Utensils size={20} />
          </motion.div>

          <motion.div
            className="orb-icon wear"
            {...floatAnim}
            transition={{ delay: 1 }}
          >
            <Shirt size={20} />
          </motion.div>

          <motion.div
            className="orb-icon grocery"
            {...floatAnim}
            transition={{ delay: 2 }}
          >
            <ShoppingBasket size={20} />
          </motion.div>

          <motion.div
            className="orb-icon budget"
            {...floatAnim}
            transition={{ delay: 3 }}
          >
            <DollarSign size={20} />
          </motion.div>

        </div>

      </section>

      {/* ================= BUDGET TOOL ================= */}
      <section id="budget" className="budget-planning-section">
        <h2>Smart Budget Planning</h2>
        <p>Let us curate the best options within your budget.</p>
        <BudgetTool token={token} />
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="product-section">
        <h2>Our Products</h2>

        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <button
                className="btn-primary"
                onClick={() => navigate("/shop")}
              >
                Discover More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        © 2025 Great IndiaMart. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;

