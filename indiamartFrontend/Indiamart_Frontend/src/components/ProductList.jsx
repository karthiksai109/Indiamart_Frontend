import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../api';
import './ProductList.css';

const ProductList = ({ addToCart }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProducts();
        const list = data.products || data || [];
        const arr = Array.isArray(list) ? list : [];
        setProducts(arr);
        setFilteredProducts(arr);
      } catch (err) {
        setError(err.message || 'Failed to load products.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }
    const term = searchTerm.toLowerCase();
    setFilteredProducts(products.filter((p) =>
      (p.name && p.name.toLowerCase().includes(term)) ||
      (p.category && p.category.toLowerCase().includes(term))
    ));
  }, [searchTerm, products]);

  if (loading) return <div className="product-list-container"><p className="loading-msg">Loading products…</p></div>;
  if (error) return <div className="product-list-container"><p className="error-msg">Error: {error}</p></div>;

  return (
    <div className="product-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Indian products…"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card pl-card">
            <div className="pl-card-image" onClick={() => navigate(`/product/${product._id}`)}>
              <img
                src={product.imageUrl || 'https://via.placeholder.com/240'}
                alt={product.name}
              />
            </div>
            <h3>{product.name}</h3>
            <p className="pl-category">{product.category}</p>
            <p className="pl-price">₹{product.price?.toLocaleString('en-IN')}</p>
            <button type="button" className="pl-btn-add" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
