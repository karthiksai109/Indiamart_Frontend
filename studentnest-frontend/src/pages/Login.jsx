import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ArrowLeft, LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { loginWithEmail } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }
    if (!password) {
      setError('Please enter your password')
      return
    }
    const result = loginWithEmail(email.trim(), password)
    if (result.error) {
      setError(result.error)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <Link to="/" style={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to home</span>
        </Link>

        <div style={styles.logoIcon}>SN</div>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in with your email and password to access your dashboard</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <Mail size={14} /> Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="your.email@university.edu"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <Lock size={14} /> Password
          </label>
          <div style={styles.passwordWrap}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Enter your password"
              style={{ ...styles.input, paddingRight: 44 }}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button onClick={handleLogin} className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
          Sign In <LogIn size={16} />
        </button>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span>or</span>
          <div style={styles.dividerLine} />
        </div>

        <Link to="/register" className="btn btn-secondary" style={{ width: '100%' }}>
          Create New Account
        </Link>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 50%, #f5f3ff 100%)',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    background: 'white',
    borderRadius: 20,
    padding: 36,
    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    color: '#64748b',
    fontSize: 13,
    textDecoration: 'none',
    marginBottom: 28,
  },
  logoIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 24,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 28,
    lineHeight: 1.5,
  },
  errorBox: {
    padding: '12px 16px',
    borderRadius: 10,
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 20,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginBottom: 16,
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 13,
    fontWeight: 600,
    color: '#475569',
  },
  input: {
    padding: '12px 16px',
    borderRadius: 10,
    border: '1.5px solid #e2e8f0',
    fontSize: 15,
    color: '#1e293b',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  passwordWrap: {
    position: 'relative',
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#94a3b8',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    margin: '20px 0',
    color: '#94a3b8',
    fontSize: 13,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: '#e2e8f0',
  },
}
