import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { UserPlus, ArrowRight, ArrowLeft, GraduationCap, Globe, Mail, Phone, User } from 'lucide-react'

export default function Register() {
  const { registerStudent, colleges, nationalities } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    collegeName: '',
    nationality: '',
  })
  const [errors, setErrors] = useState({})

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validateStep1 = () => {
    const errs = {}
    if (!form.fullName.trim()) errs.fullName = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const errs = {}
    if (!form.collegeName) errs.collegeName = 'Select your college'
    if (!form.nationality) errs.nationality = 'Select your nationality'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2)
  }

  const handleSubmit = () => {
    if (!validateStep2()) return
    const college = colleges.find(c => c.name === form.collegeName)
    const student = registerStudent({
      ...form,
      city: college?.city,
      country: college?.country,
    })
    navigate('/dashboard')
  }

  return (
    <div style={styles.page}>
      <div className="register-left-panel" style={styles.left}>
        <Link to="/" style={styles.backLink}>
          <ArrowLeft size={18} />
          <span>Back to home</span>
        </Link>
        <div style={styles.leftContent}>
          <div style={styles.logoIcon}>SN</div>
          <h1 style={styles.leftTitle}>Join StudentNest</h1>
          <p style={styles.leftDesc}>
            Create your account in 30 seconds and get instant access to housing, food, community, and sports recommendations near your campus.
          </p>
          <div style={styles.leftFeatures}>
            {[
              'Personalized recommendations based on your college',
              'Connect with students from your country',
              'Verified listings with real reviews',
              'Completely free to use',
            ].map((f, i) => (
              <div key={i} style={styles.leftFeature}>
                <div style={styles.leftCheck}>✓</div>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="register-right-panel" style={styles.right}>
        <div style={styles.formWrap}>
          <div style={styles.stepIndicator}>
            <div style={{ ...styles.stepDot, background: '#0f766e' }}>1</div>
            <div style={{ ...styles.stepLine, background: step >= 2 ? '#0f766e' : '#e2e8f0' }} />
            <div style={{ ...styles.stepDot, background: step >= 2 ? '#0f766e' : '#e2e8f0', color: step >= 2 ? 'white' : '#94a3b8' }}>2</div>
          </div>

          <h2 style={styles.formTitle}>
            {step === 1 ? 'Personal Information' : 'Academic Details'}
          </h2>
          <p style={styles.formSubtitle}>
            {step === 1 ? 'Tell us about yourself' : 'Where are you studying?'}
          </p>

          {step === 1 && (
            <div style={styles.fields}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <User size={14} /> Full Name
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={e => update('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  style={{ ...styles.input, ...(errors.fullName ? styles.inputError : {}) }}
                />
                {errors.fullName && <span style={styles.error}>{errors.fullName}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Mail size={14} /> Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  placeholder="your.email@university.edu"
                  style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
                />
                {errors.email && <span style={styles.error}>{errors.email}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Phone size={14} /> Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => update('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  style={{ ...styles.input, ...(errors.phone ? styles.inputError : {}) }}
                />
                {errors.phone && <span style={styles.error}>{errors.phone}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Student ID (optional)</label>
                <input
                  type="text"
                  value={form.studentId}
                  onChange={e => update('studentId', e.target.value)}
                  placeholder="e.g. STU-2024-1234"
                  style={styles.input}
                />
              </div>

              <button onClick={handleNext} className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={styles.fields}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <GraduationCap size={14} /> College / University
                </label>
                <select
                  value={form.collegeName}
                  onChange={e => update('collegeName', e.target.value)}
                  style={{ ...styles.input, ...(errors.collegeName ? styles.inputError : {}) }}
                >
                  <option value="">Select your college</option>
                  {colleges.map(c => (
                    <option key={c.name} value={c.name}>
                      {c.name} — {c.city}, {c.country}
                    </option>
                  ))}
                </select>
                {errors.collegeName && <span style={styles.error}>{errors.collegeName}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Globe size={14} /> Nationality
                </label>
                <select
                  value={form.nationality}
                  onChange={e => update('nationality', e.target.value)}
                  style={{ ...styles.input, ...(errors.nationality ? styles.inputError : {}) }}
                >
                  <option value="">Select your nationality</option>
                  {nationalities.map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                {errors.nationality && <span style={styles.error}>{errors.nationality}</span>}
              </div>

              <div style={styles.btnRow}>
                <button onClick={() => setStep(1)} className="btn btn-secondary" style={{ flex: 1 }}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={handleSubmit} className="btn btn-primary" style={{ flex: 2 }}>
                  Create Account <UserPlus size={16} />
                </button>
              </div>
            </div>
          )}

          <p style={styles.loginLink}>
            Already have an account? <Link to="/login" style={{ color: '#0f766e', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
  },
  left: {
    flex: 1,
    background: 'linear-gradient(135deg, #0f766e, #0d5c56)',
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    position: 'relative',
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    textDecoration: 'none',
    marginBottom: 40,
  },
  leftContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 420,
  },
  logoIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    background: 'rgba(255,255,255,0.15)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 24,
  },
  leftTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 12,
  },
  leftDesc: {
    fontSize: 16,
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 32,
  },
  leftFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  leftFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  leftCheck: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
    flexShrink: 0,
  },
  right: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    background: 'white',
  },
  formWrap: {
    width: '100%',
    maxWidth: 440,
  },
  stepIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    marginBottom: 32,
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 700,
    color: 'white',
    flexShrink: 0,
  },
  stepLine: {
    flex: 1,
    height: 2,
    borderRadius: 1,
  },
  formTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 24,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 28,
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
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
    transition: 'border-color 0.2s',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  error: {
    fontSize: 12,
    color: '#ef4444',
    fontWeight: 500,
  },
  btnRow: {
    display: 'flex',
    gap: 12,
    marginTop: 8,
  },
  loginLink: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
    color: '#64748b',
  },
}

