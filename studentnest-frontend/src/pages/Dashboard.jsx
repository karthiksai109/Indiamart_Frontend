import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Building2, UtensilsCrossed, Users, Trophy, MapPin, GraduationCap, Globe, Copy, Check, ArrowRight, TrendingUp, Clock, Star } from 'lucide-react'
import { useState } from 'react'

const QUICK_LINKS = [
  { path: '/housing', icon: Building2, title: 'Housing', desc: 'Find affordable apartments and rooms near campus', color: '#0f766e', bg: '#f0fdfa' },
  { path: '/food', icon: UtensilsCrossed, title: 'Food & Grocery', desc: 'Discover restaurants and stores with your national cuisine', color: '#ea580c', bg: '#fff7ed' },
  { path: '/community', icon: Users, title: 'Community', desc: 'Join groups and events with students from your country', color: '#7c3aed', bg: '#f5f3ff' },
  { path: '/sports', icon: Trophy, title: 'Sports', desc: 'Find sports leagues, pickup games, and fitness groups', color: '#0369a1', bg: '#f0f9ff' },
]

const TIPS = [
  { icon: Clock, text: 'Start your housing search at least 2 months before your arrival date' },
  { icon: TrendingUp, text: 'Prices are usually lower during summer months for most college towns' },
  { icon: Star, text: 'Check reviews from other international students for the most relevant feedback' },
  { icon: Globe, text: 'Join your national community group early — they often help with airport pickups' },
]

export default function Dashboard() {
  const { student } = useApp()
  const [copied, setCopied] = useState(false)

  if (!student) return null

  const copyId = () => {
    navigator.clipboard.writeText(student.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="dashboard-welcome" style={styles.welcome}>
          <div style={styles.welcomeLeft}>
            <h1 style={styles.welcomeTitle}>
              Welcome, {student.fullName?.split(' ')[0]}
            </h1>
            <p style={styles.welcomeDesc}>
              Here's everything you need to settle in near <strong>{student.college?.name || student.collegeName}</strong>. 
              Explore housing, food, community groups, and sports activities tailored for you.
            </p>
          </div>
          <div style={styles.welcomeRight}>
            <div style={styles.idCard}>
              <div style={styles.idCardHeader}>Your Student ID</div>
              <div style={styles.idCardValue}>
                <span>{student.id}</span>
                <button onClick={copyId} style={styles.copyBtn} title="Copy ID">
                  {copied ? <Check size={14} color="#047857" /> : <Copy size={14} />}
                </button>
              </div>
              <div style={styles.idCardHint}>Use this ID to sign in on any device</div>
            </div>
          </div>
        </div>

        <div className="dashboard-profile-cards" style={styles.profileCards}>
          <div style={styles.profileCard}>
            <GraduationCap size={20} color="#0f766e" />
            <div>
              <div style={styles.profileLabel}>College</div>
              <div style={styles.profileValue}>{student.college?.name || student.collegeName}</div>
            </div>
          </div>
          <div style={styles.profileCard}>
            <MapPin size={20} color="#0f766e" />
            <div>
              <div style={styles.profileLabel}>Location</div>
              <div style={styles.profileValue}>{student.college?.city}, {student.college?.country}</div>
            </div>
          </div>
          <div style={styles.profileCard}>
            <Globe size={20} color="#0f766e" />
            <div>
              <div style={styles.profileLabel}>Nationality</div>
              <div style={styles.profileValue}>{student.nationality}</div>
            </div>
          </div>
        </div>

        <h2 style={styles.sectionTitle}>Explore Near Your Campus</h2>
        <div className="dashboard-quick-links" style={styles.quickLinks}>
          {QUICK_LINKS.map((link, i) => {
            const Icon = link.icon
            return (
              <Link key={i} to={link.path} style={styles.quickCard}>
                <div style={{ ...styles.quickIcon, background: link.bg, color: link.color }}>
                  <Icon size={28} />
                </div>
                <h3 style={styles.quickTitle}>{link.title}</h3>
                <p style={styles.quickDesc}>{link.desc}</p>
                <div style={{ ...styles.quickArrow, color: link.color }}>
                  Explore <ArrowRight size={14} />
                </div>
              </Link>
            )
          })}
        </div>

        <h2 style={{ ...styles.sectionTitle, marginTop: 48 }}>Tips for New Students</h2>
        <div className="dashboard-tips-grid" style={styles.tipsGrid}>
          {TIPS.map((tip, i) => {
            const Icon = tip.icon
            return (
              <div key={i} style={styles.tipCard}>
                <Icon size={18} color="#0f766e" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={styles.tipText}>{tip.text}</span>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

const styles = {
  welcome: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 32,
    padding: '40px 0 24px',
    flexWrap: 'wrap',
  },
  welcomeLeft: {
    flex: 1,
    minWidth: 300,
  },
  welcomeTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 32,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 8,
  },
  welcomeDesc: {
    fontSize: 16,
    lineHeight: 1.7,
    color: '#64748b',
    maxWidth: 520,
  },
  welcomeRight: {},
  idCard: {
    background: '#f0fdfa',
    border: '1px solid #99f6e4',
    borderRadius: 14,
    padding: '16px 20px',
    minWidth: 240,
  },
  idCardHeader: {
    fontSize: 11,
    fontWeight: 600,
    color: '#0f766e',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 6,
  },
  idCardValue: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 18,
    fontWeight: 700,
    color: '#0f172a',
    fontFamily: 'monospace',
  },
  copyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    background: 'white',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#64748b',
  },
  idCardHint: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 6,
  },
  profileCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
    marginBottom: 40,
  },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '18px 20px',
    background: 'white',
    borderRadius: 14,
    border: '1px solid #e2e8f0',
  },
  profileLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: 500,
  },
  profileValue: {
    fontSize: 15,
    fontWeight: 600,
    color: '#1e293b',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 22,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 20,
  },
  quickLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 20,
  },
  quickCard: {
    background: 'white',
    borderRadius: 16,
    padding: 24,
    border: '1px solid #e2e8f0',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  quickIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quickTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 6,
  },
  quickDesc: {
    fontSize: 13,
    lineHeight: 1.6,
    color: '#64748b',
    flex: 1,
    marginBottom: 14,
  },
  quickArrow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 13,
    fontWeight: 600,
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 14,
    marginBottom: 40,
  },
  tipCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '16px 20px',
    background: 'white',
    borderRadius: 12,
    border: '1px solid #e2e8f0',
  },
  tipText: {
    fontSize: 14,
    lineHeight: 1.5,
    color: '#475569',
  },
}

