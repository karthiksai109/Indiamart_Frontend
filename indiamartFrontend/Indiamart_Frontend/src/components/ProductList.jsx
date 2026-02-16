import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, Search, Mic, MicOff, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { getAllProducts, addToWishlist, removeFromWishlist, getWishlist, runIngestion } from '../api';
import { API_BASE } from '../config';
import './ProductList.css';

const ProductList = ({ addToCart }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favIds, setFavIds] = useState(() => new Set());
  const [savingId, setSavingId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [isListening, setIsListening] = useState(false);
  const [liveConnected, setLiveConnected] = useState(false);
  const [ingesting, setIngesting] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const recognitionRef = useRef(null);

  // Load products — show cache instantly, refresh from API in background
  useEffect(() => {
    // Show cached products immediately (no loading spinner)
    try {
      const ts = parseInt(localStorage.getItem('cachedProductsTs') || '0');
      if (Date.now() - ts < 5 * 60 * 1000) {
        const cached = JSON.parse(localStorage.getItem('cachedProducts'));
        if (Array.isArray(cached) && cached.length > 0) {
          setProducts(cached);
          setFilteredProducts(cached);
          setLoading(false);
          setLiveConnected(true);
        }
      }
    } catch {}

    // Fetch fresh data from API
    (async () => {
      try {
        const data = await getAllProducts();
        const list = data.products || data || [];
        const arr = Array.isArray(list) ? list : [];
        if (arr.length > 0) {
          setProducts(arr);
          setFilteredProducts(arr);
        }
        setLiveConnected(!data.fromCache);
      } catch (err) {
        // Only show error if we have no products at all
        setProducts((prev) => {
          if (prev.length === 0) setError(err.message || 'Failed to load products.');
          return prev;
        });
        setLiveConnected(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Load wishlist IDs on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    (async () => {
      try {
        const res = await getWishlist();
        const ids = new Set();
        (res.wishlist || []).forEach((w) => {
          const id = w.productId?._id || w.productId;
          if (id) ids.add(id);
        });
        setFavIds(ids);
      } catch {}
    })();
  }, []);

  // Load recently viewed from localStorage
  useEffect(() => {
    try {
      const rv = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      setRecentlyViewed(rv.slice(0, 6));
    } catch {}
  }, []);

  // Filter + sort
  useEffect(() => {
    let result = [...products];

    if (categoryFilter !== 'All') {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((p) =>
        (p.name && p.name.toLowerCase().includes(term)) ||
        (p.category && p.category.toLowerCase().includes(term)) ||
        (p.description && p.description.toLowerCase().includes(term))
      );
    }

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
    else if (sortBy === 'newest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredProducts(result);
  }, [searchTerm, products, categoryFilter, sortBy]);

  const categories = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];

  // Voice search
  const toggleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const handleFavorite = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to your wishlist.');
      navigate('/login');
      return;
    }
    const id = product._id;
    const wasInWishlist = favIds.has(id);
    setSavingId(id);

    // Optimistic UI update
    setFavIds((prev) => {
      const next = new Set(prev);
      wasInWishlist ? next.delete(id) : next.add(id);
      return next;
    });

    try {
      if (wasInWishlist) {
        await removeFromWishlist(id);
      } else {
        await addToWishlist(id, true);
      }
    } catch (e) {
      // Revert on failure
      console.error('Wishlist error:', e);
      setFavIds((prev) => {
        const next = new Set(prev);
        wasInWishlist ? next.add(id) : next.delete(id);
        return next;
      });
    } finally {
      setSavingId(null);
    }
  };

  const handleProductClick = (product) => {
    // Track recently viewed
    try {
      const rv = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const filtered = rv.filter((p) => p._id !== product._id);
      filtered.unshift({ _id: product._id, name: product.name, imageUrl: product.imageUrl, price: product.price });
      localStorage.setItem('recentlyViewed', JSON.stringify(filtered.slice(0, 10)));
    } catch {}
    navigate(`/product/${product._id}`);
  };

  const handleRunIngestion = async () => {
    setIngesting(true);
    try {
      await runIngestion('all');
      const data = await getAllProducts();
      const list = data.products || data || [];
      setProducts(Array.isArray(list) ? list : []);
    } catch {}
    setIngesting(false);
  };

  const handleShare = async (product) => {
    const url = `${window.location.origin}/product/${product._id}`;
    const text = `Check out ${product.name} on IndiaMart — $${product.price}`;
    if (navigator.share) {
      try { await navigator.share({ title: product.name, text, url }); } catch {}
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const r = Math.round(rating || 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} size={12} className={i <= r ? 'star-filled' : 'star-empty'} />
      );
    }
    return stars;
  };

  if (loading) return <div className="product-list-container"><p className="loading-msg">Loading products…</p></div>;
  if (error) return <div className="product-list-container"><p className="error-msg">Error: {error}</p></div>;

  return (
    <div className="product-list-container">
      {/* Live connection indicator */}
      <div className="pl-toolbar">
        <div className="pl-live-badge">
          {liveConnected ? <Wifi size={14} /> : <WifiOff size={14} />}
          <span>{liveConnected ? 'Live' : 'Offline'}</span>
        </div>
        <button type="button" className="pl-sync-btn" onClick={handleRunIngestion} disabled={ingesting} title="Sync products from Azure/Snowflake">
          <RefreshCw size={14} className={ingesting ? 'spinning' : ''} />
          {ingesting ? 'Syncing…' : 'Sync Data'}
        </button>
      </div>

      {/* Search bar with voice */}
      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search Indian products…"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" className={`voice-btn ${isListening ? 'listening' : ''}`} onClick={toggleVoiceSearch} title="Voice search">
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
      </div>

      {/* Filters */}
      <div className="pl-filters">
        <div className="pl-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`pl-cat-btn ${categoryFilter === cat ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <select className="pl-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Sort by</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="rating">Top Rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <div className="recently-viewed">
          <h4>Recently Viewed</h4>
          <div className="rv-scroll">
            {recentlyViewed.map((p) => (
              <div key={p._id} className="rv-item" onClick={() => navigate(`/product/${p._id}`)}>
                <img src={p.imageUrl || 'https://via.placeholder.com/60'} alt={p.name} />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="pl-result-count">{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</p>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card pl-card">
            <button
              type="button"
              className={`pl-fav ${favIds.has(product._id) ? 'active' : ''}`}
              onClick={() => handleFavorite(product)}
              disabled={savingId === product._id}
              aria-label={favIds.has(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
              title={favIds.has(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={18} fill={favIds.has(product._id) ? 'currentColor' : 'none'} />
            </button>
            <div className="pl-card-image" onClick={() => handleProductClick(product)}>
              <img
                src={product.imageUrl || 'https://via.placeholder.com/240'}
                alt={product.name}
              />
            </div>
            <h3 onClick={() => handleProductClick(product)}>{product.name}</h3>
            <p className="pl-category">{product.category}</p>
            {(product.avgRating > 0) && (
              <div className="pl-rating">
                {renderStars(product.avgRating)}
                <span className="pl-rating-count">({product.reviewCount || 0})</span>
              </div>
            )}
            <div className="pl-price-row">
              <p className="pl-price">${product.price?.toLocaleString('en-US')}</p>
              <button type="button" className="pl-share-btn" onClick={() => handleShare(product)} title="Share">
                ↗
              </button>
            </div>
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
