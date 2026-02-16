import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const data = await response.json();

      if (response.ok && data.status === true) {
        const user = data.data;
        localStorage.setItem('user', JSON.stringify({ name: user.name, userId: user.userId, token: user.token }));
        localStorage.setItem('token', user.token);
        localStorage.setItem('userId', user.userId);
        navigate('/');
      } else {
        setError(data.message || 'Login failed. Check your credentials.');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Server is starting up. Please wait 30 seconds and try again.');
      } else {
        setError('Network error. Make sure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='Body'>
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-header">Welcome to Great IndiaMart</h1>
          <p className="login-subtitle">Sign in to continue shopping</p>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate('/register')} className="link">Sign up here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
