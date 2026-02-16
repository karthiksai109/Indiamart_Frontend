import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Home, Building2, UtensilsCrossed, Users, Trophy, Menu, X, LogOut, User } from 'lucide-react'

const NAV_LINKS = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/housing', label: 'Housing', icon: Building2 },
  { path: '/food', label: 'Food & Grocery', icon: UtensilsCrossed },
  { path: '/community', label: 'Community', icon: Users },
  { path: '/sports', label: 'Sports', icon: Trophy },
]

export default function Navbar() {
  const { student, logout } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!student) return null

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.inner}>
          <Link to="/dashboard" style={styles.logo}>
            <div style={styles.logoIcon}>SN</div>
            <span style={styles.logoText}>StudentNest</span>
          </Link>

          <div className="nav-links-desktop" style={styles.links}>
            {NAV_LINKS.map(link => {
              const Icon = link.icon
              const active = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    ...styles.link,
                    ...(active ? styles.linkActive : {})
                  }}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>

          <div style={styles.right}>
            <div style={styles.userInfo}>
              <div style={styles.avatar}>
                <User size={16} />
              </div>
              <span className="nav-user-name" style={styles.userName}>{student.fullName?.split(' ')[0]}</span>
            </div>
            <button className="nav-logout-desktop" onClick={handleLogout} style={styles.logoutBtn} title="Sign out">
              <LogOut size={18} />
            </button>
            <button
              className="nav-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={styles.menuBtn}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div style={styles.mobileMenu}>
          {NAV_LINKS.map(link => {
            const Icon = link.icon
            const active = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  ...styles.mobileLink,
                  ...(active ? styles.mobileLinkActive : {})
                }}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={20} />
                <span>{link.label}</span>
              </Link>
            )
          })}
          <button onClick={handleLogout} style={styles.mobileLogout}>
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      <div style={{ height: 64 }} />
    </>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border)',
    zIndex: 1000,
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 14,
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 20,
    color: 'var(--text-primary)',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 14px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  linkActive: {
    color: 'var(--primary)',
    background: 'var(--primary-bg)',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'var(--primary-bg)',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  logoutBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: 'transparent',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
  },
  menuBtn: {
    display: 'none',
    width: 40,
    height: 40,
    borderRadius: 8,
    background: 'transparent',
    color: 'var(--text-primary)',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
  },
  mobileMenu: {
    position: 'fixed',
    top: 64,
    left: 0,
    right: 0,
    background: 'white',
    borderBottom: '1px solid var(--border)',
    padding: 16,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    boxShadow: 'var(--shadow-lg)',
  },
  mobileLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 16px',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 500,
    color: 'var(--text-secondary)',
    textDecoration: 'none',
  },
  mobileLinkActive: {
    color: 'var(--primary)',
    background: 'var(--primary-bg)',
  },
  mobileLogout: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 16px',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 500,
    color: '#ef4444',
    background: '#fef2f2',
    border: 'none',
    cursor: 'pointer',
    marginTop: 8,
  },
}

