import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Send, ShoppingCart, Sparkles, Bot, User, Volume2 } from 'lucide-react';
import { API_BASE } from '../config';
import './AIAssistant.css';

const STEPS = [
  {
    key: 'type',
    question: "What's your food preference?",
    options: [
      { label: 'Vegetarian', value: 'veg', emoji: '🥬' },
      { label: 'Non-Vegetarian', value: 'nonveg', emoji: '🍗' },
      { label: 'Both', value: 'both', emoji: '🍽️' },
    ],
  },
  {
    key: 'purpose',
    question: "What are you shopping for today?",
    options: [
      { label: 'Food & Groceries', value: 'food', emoji: '🛒' },
      { label: 'Clothing', value: 'clothing', emoji: '👗' },
      { label: 'Kitchen & Home', value: 'kitchen', emoji: '🏠' },
      { label: 'Wellness & Beauty', value: 'wellness', emoji: '💆' },
      { label: 'Festival & Puja', value: 'festival', emoji: '🪔' },
      { label: 'Everything', value: 'all', emoji: '✨' },
    ],
  },
  {
    key: 'occasion',
    question: "What's the occasion?",
    options: [
      { label: 'Daily Essentials', value: 'daily', emoji: '📦' },
      { label: 'Festival / Celebration', value: 'festival', emoji: '🎉' },
      { label: 'Gift for Someone', value: 'gift', emoji: '🎁' },
    ],
  },
  {
    key: 'budget',
    question: "What's your budget? (in $)",
    type: 'input',
  },
];

const AIAssistant = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({});
  const [messages, setMessages] = useState([
    { from: 'ai', text: "Hi! I'm your Great IndiaMart AI Shopping Assistant. I'll help you find the perfect products within your budget. Let me ask you a few quick questions!" },
    { from: 'ai', text: STEPS[0].question, options: STEPS[0].options },
  ]);
  const [budgetInput, setBudgetInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [summary, setSummary] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, plans]);

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleOptionSelect = (stepData, value, label) => {
    const newPrefs = { ...preferences, [stepData.key]: value };
    setPreferences(newPrefs);

    setMessages((prev) => [
      ...prev,
      { from: 'user', text: label },
    ]);

    const nextStep = step + 1;
    if (nextStep < STEPS.length) {
      setStep(nextStep);
      const nextQ = STEPS[nextStep];
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { from: 'ai', text: nextQ.question, options: nextQ.options, type: nextQ.type },
        ]);
        speak(nextQ.question);
      }, 400);
    }
  };

  const handleBudgetSubmit = async () => {
    const num = parseFloat(budgetInput);
    if (!num || num <= 0) return;

    setMessages((prev) => [...prev, { from: 'user', text: `$${num}` }]);
    setMessages((prev) => [...prev, { from: 'ai', text: 'Analyzing your preferences and finding the best deals...' }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/ai/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences, budget: num }),
      });
      const data = await res.json();

      if (data.status && data.plans?.length > 0) {
        setSummary(data.summary);
        setPlans(data.plans);
        setMessages((prev) => [
          ...prev,
          { from: 'ai', text: data.summary },
        ]);
        speak(data.summary);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: 'ai', text: 'No products found matching your preferences. Try a higher budget or different category!' },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: 'ai', text: 'Oops! Could not connect to the server. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlanToCart = (plan) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    plan.forEach((item) => {
      const existing = cart.find((c) => c._id === item._id);
      if (existing) existing.quantity = (existing.quantity || 1) + 1;
      else cart.push({ ...item, quantity: 1 });
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    navigate('/cart');
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;

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
      const transcript = event.results[0][0].transcript.toLowerCase();
      setIsListening(false);

      // Try to match voice input to current step options
      const currentStep = STEPS[step];
      if (currentStep?.options) {
        const match = currentStep.options.find((opt) =>
          transcript.includes(opt.label.toLowerCase()) || transcript.includes(opt.value)
        );
        if (match) {
          handleOptionSelect(currentStep, match.value, match.label);
          return;
        }
      }

      // If budget step, try to parse number
      if (currentStep?.type === 'input') {
        const num = parseFloat(transcript.replace(/[^0-9.]/g, ''));
        if (num > 0) {
          setBudgetInput(String(num));
          return;
        }
      }

      setMessages((prev) => [...prev, { from: 'user', text: transcript }]);
      setMessages((prev) => [...prev, { from: 'ai', text: "I didn't catch that. Please try selecting an option or speaking more clearly." }]);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const handleReset = () => {
    setStep(0);
    setPreferences({});
    setPlans([]);
    setSummary('');
    setBudgetInput('');
    setMessages([
      { from: 'ai', text: "Let's start fresh! I'll help you find the perfect products." },
      { from: 'ai', text: STEPS[0].question, options: STEPS[0].options },
    ]);
  };

  return (
    <div className="ai-assistant-page">
      <div className="ai-container">
        <div className="ai-header">
          <div className="ai-header-left">
            <Sparkles size={22} />
            <div>
              <h2>AI Shopping Assistant</h2>
              <p>Your personal Indian shopping guide</p>
            </div>
          </div>
          <div className="ai-header-actions">
            <button
              type="button"
              className={`ai-voice-btn ${isListening ? 'listening' : ''}`}
              onClick={toggleVoice}
              title="Voice input"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            {isSpeaking && <Volume2 size={16} className="ai-speaking" />}
          </div>
        </div>

        <div className="ai-chat">
          {messages.map((msg, i) => (
            <div key={i} className={`ai-msg ${msg.from}`}>
              <div className="ai-msg-icon">
                {msg.from === 'ai' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className="ai-msg-content">
                <p>{msg.text}</p>
                {msg.options && step === STEPS.findIndex((s) => s.question === msg.text) && !plans.length && (
                  <div className="ai-options">
                    {msg.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        className="ai-option-btn"
                        onClick={() => handleOptionSelect(STEPS[step], opt.value, opt.label)}
                      >
                        <span className="ai-opt-emoji">{opt.emoji}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
                {msg.type === 'input' && !plans.length && (
                  <div className="ai-budget-input">
                    <input
                      type="number"
                      min="1"
                      placeholder="Enter your budget..."
                      value={budgetInput}
                      onChange={(e) => setBudgetInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleBudgetSubmit()}
                    />
                    <button type="button" onClick={handleBudgetSubmit} disabled={loading}>
                      <Send size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="ai-msg ai">
              <div className="ai-msg-icon"><Bot size={16} /></div>
              <div className="ai-msg-content">
                <div className="ai-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}

          {plans.length > 0 && (
            <div className="ai-plans">
              <h3>Your Personalized Plans</h3>
              {plans.map((plan, pi) => {
                const total = plan.reduce((s, p) => s + p.price, 0);
                return (
                  <div key={pi} className="ai-plan-card">
                    <div className="ai-plan-header">
                      <span className="ai-plan-badge">Plan {pi + 1}</span>
                      <span className="ai-plan-total">${total.toFixed(2)}</span>
                    </div>
                    <div className="ai-plan-items">
                      {plan.map((item) => (
                        <div key={item._id} className="ai-plan-item" onClick={() => navigate(`/product/${item._id}`)}>
                          <img src={item.imageUrl || 'https://via.placeholder.com/48'} alt={item.name} />
                          <div className="ai-plan-item-info">
                            <strong>{item.name}</strong>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="ai-plan-add-btn"
                      onClick={() => handleAddPlanToCart(plan)}
                    >
                      <ShoppingCart size={16} />
                      Add All to Cart (${total.toFixed(2)})
                    </button>
                  </div>
                );
              })}
              <button type="button" className="ai-reset-btn" onClick={handleReset}>
                Start Over
              </button>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
