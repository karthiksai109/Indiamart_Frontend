import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBudgetPlans } from '../api';
import './BudgetTool.css';

const BudgetTool = ({ token }) => {
  const [budget, setBudget] = useState('');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckBudget = async () => {
    const num = parseFloat(budget);
    if (!num || num <= 0) {
      alert('Please enter a valid budget (₹).');
      return;
    }
    setLoading(true);
    try {
      const data = await getBudgetPlans(num);
      if (data.status && data.plans && Array.isArray(data.plans)) {
        setPlans(data.plans);
      } else {
        setPlans([]);
        alert(data.message || 'No plans for this budget.');
      }
    } catch (e) {
      setPlans([]);
      alert('Something went wrong. Try again.');
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
    alert('Items added to cart.');
    navigate('/cart');
  };

  return (
    <div className="budget-tool-wrap">
      <div className="budget-tool-input">
        <label>Enter your budget (₹)</label>
        <input
          type="number"
          min="1"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="e.g. 5000"
        />
        <button type="button" className="btn-get-plans" onClick={handleCheckBudget} disabled={loading}>
          {loading ? 'Getting plans…' : 'Get plans'}
        </button>
      </div>

      {plans.length > 0 && (
        <div className="budget-plans">
          {plans.map((plan, index) => {
            const total = plan.reduce((s, p) => s + (p.price || 0), 0);
            return (
              <div key={index} className="budget-plan-card">
                <h4>Plan {index + 1} – ₹{total.toLocaleString('en-IN')}</h4>
                <ul>
                  {plan.map((item) => (
                    <li key={item._id}>{item.name} – ₹{item.price?.toLocaleString('en-IN')}</li>
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
