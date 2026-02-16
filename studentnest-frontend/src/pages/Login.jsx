import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ArrowLeft, LogIn, IdCard } from 'lucide-react'

export default function Login() {
  const { loginWithStudentId } = useApp()
  const navigate = useNavigate()
  const [studentId, setStudentId] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!studentId.trim()) {
      setError('Please enter your Student ID')
      return
    }
    const student = loginWithStudentId(studentId.trim())
    if (student) {
      navigate('/dashboard')
    } else {
      setError('No account found with this Student ID. Please register first.')
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
        <p style={styles.subtitle}>Sign in with your Student ID to access your dashboard</p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <IdCard size={14} /> Student ID
          </label>
          <input
            type="text"
            value={studentId}
            onChange={e => { setStudentId(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="e.g. STU-M2X5K9R"
            style={{ ...styles.input, ...(error ? { borderColor: '#ef4444' } : {}) }}
          />
          {error && <span style={styles.error}>{error}</span>}
        </div>

        <button onClick={handleLogin} className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
          Sign In <LogIn size={16} />
        </button>

        <div style={styles.divider}>
          <span>or</span>
        </div>

        <Link to="/register" className="btn btn-secondary" style={{ width: '100%' }}>
          Create New Account
        </Link>

        <p style={styles.hint}>
          Your Student ID was provided when you registered. Check your registration confirmation.
        </p>
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
  error: {
    fontSize: 12,
    color: '#ef4444',
    fontWeight: 500,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    margin: '20px 0',
    color: '#94a3b8',
    fontSize: 13,
  },
  hint: {
    marginTop: 20,
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 1.5,
  },
}
