import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.left}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>SN</div>
            <span style={styles.logoText}>StudentNest</span>
          </div>
          <p style={styles.tagline}>Helping international students feel at home, anywhere in the world.</p>
        </div>
        <div style={styles.links}>
          <div style={styles.linkCol}>
            <h4 style={styles.colTitle}>Discover</h4>
            <a href="/housing" style={styles.link}>Housing</a>
            <a href="/food" style={styles.link}>Food & Grocery</a>
            <a href="/community" style={styles.link}>Community</a>
            <a href="/sports" style={styles.link}>Sports</a>
          </div>
          <div style={styles.linkCol}>
            <h4 style={styles.colTitle}>Company</h4>
            <a href="#" style={styles.link}>About Us</a>
            <a href="#" style={styles.link}>Careers</a>
            <a href="#" style={styles.link}>Contact</a>
            <a href="#" style={styles.link}>Blog</a>
          </div>
          <div style={styles.linkCol}>
            <h4 style={styles.colTitle}>Legal</h4>
            <a href="#" style={styles.link}>Privacy Policy</a>
            <a href="#" style={styles.link}>Terms of Service</a>
            <a href="#" style={styles.link}>Cookie Policy</a>
          </div>
        </div>
      </div>
      <div style={styles.bottom}>
        <p style={styles.copyright}>
          &copy; {new Date().getFullYear()} StudentNest. Built with <Heart size={12} style={{ display: 'inline', verticalAlign: 'middle', color: '#ef4444' }} /> for international students worldwide.
        </p>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: '#0f172a',
    color: '#94a3b8',
    marginTop: 80,
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '60px 24px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 60,
    flexWrap: 'wrap',
  },
  left: {
    maxWidth: 300,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
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
    fontWeight: 700,
    fontSize: 14,
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 20,
    color: 'white',
  },
  tagline: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#64748b',
  },
  links: {
    display: 'flex',
    gap: 60,
    flexWrap: 'wrap',
  },
  linkCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  colTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: 'white',
    marginBottom: 4,
  },
  link: {
    fontSize: 13,
    color: '#64748b',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  bottom: {
    borderTop: '1px solid #1e293b',
    padding: '20px 24px',
    textAlign: 'center',
  },
  copyright: {
    fontSize: 13,
    color: '#475569',
  },
}
