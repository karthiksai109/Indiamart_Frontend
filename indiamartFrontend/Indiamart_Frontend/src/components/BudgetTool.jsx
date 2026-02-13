import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBudgetPlans } from '../api';
import './BudgetTool.css';

const BudgetTool = ({ token }) => {
  const [budget, setBudget] = useState('');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckBudget = async () => {
    const num = parseFloat(budget);
    setError('');
    if (!num || num <= 0) {
      setError('Enter a valid budget ($).');
      return;
    }
    setLoading(true);
    try {
      const data = await getBudgetPlans(num);
      if (data.status && data.plans && Array.isArray(data.plans)) {
        setPlans(data.plans.filter((p) => p && p.length > 0));
      } else {
        setPlans([]);
        setError(data.message || 'No plans for this budget.');
      }
    } catch (e) {
      setPlans([]);
      setError(e.message || 'Check your connection. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (plan) => {
    const existing = JSON.parse(localStorage.getItem('cart')) || [];
    const updated = [...existing];
    plan.forEach((item) => {
      const match = updated.find((p) => p._id === item._id);
      if (match) match.quantity = (match.quantity || 1) + 1;
      else updated.push({ ...item, quantity: 1 });
    });
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
    navigate('/cart');
  };

  return (
    <div className="budget-tool-wrap">
      <div className="budget-tool-input">
        <label>Your budget ($)</label>
        <input
          type="number"
          min="1"
          step="100"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="e.g. 5000"
          onKeyDown={(e) => e.key === 'Enter' && handleCheckBudget()}
        />
        <button type="button" className="btn-get-plans" onClick={handleCheckBudget} disabled={loading}>
          {loading ? 'Getting plans…' : 'Get plans'}
        </button>
      </div>
      {error && <p className="budget-tool-error">{error}</p>}

      {plans.length > 0 && (
        <div className="budget-plans">
          <p className="budget-plans-heading">Plans within your budget</p>
          {plans.map((plan, index) => {
            const total = plan.reduce((s, p) => s + (p.price || 0), 0);
            return (
              <div key={index} className="budget-plan-card">
                <div className="budget-plan-header">
                  <span className="plan-badge">Plan {index + 1}</span>
                  <span className="plan-total">${total.toLocaleString('en-US')}</span>
                </div>
                <ul className="budget-plan-list">
                  {plan.map((item) => (
                    <li key={item._id}>
                      <span className="plan-item-name">{item.name}</span>
                      <span className="plan-item-price">${item.price?.toLocaleString('en-US')}</span>
                    </li>
                  ))}
                </ul>
                <button type="button" className="btn-add-plan" onClick={() => handleAddToCart(plan)}>
                  Add all to cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BudgetTool;
