import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ArrowRight, Building2, UtensilsCrossed, Users, Trophy, Globe, Shield, MapPin, Star, ChevronRight, Zap, Heart } from 'lucide-react'

const FEATURES = [
  {
    icon: Building2,
    title: 'Affordable Housing',
    desc: 'Find verified, budget-friendly apartments and rooms near your campus with real pricing and direct landlord contacts.',
    color: '#0f766e',
    bg: '#f0fdfa',
  },
  {
    icon: UtensilsCrossed,
    title: 'Home Food & Groceries',
    desc: 'Discover restaurants and grocery stores that serve your national cuisine. Never miss the taste of home.',
    color: '#ea580c',
    bg: '#fff7ed',
  },
  {
    icon: Users,
    title: 'Community Groups',
    desc: 'Connect with students from your country. Join cultural events, festivals, and build lifelong friendships.',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    icon: Trophy,
    title: 'Sports & Activities',
    desc: 'Find pickup games, sports leagues, and fitness groups. Stay active and meet people through sports.',
    color: '#0369a1',
    bg: '#f0f9ff',
  },
]

const STATS = [
  { value: '50+', label: 'Universities' },
  { value: '10K+', label: 'Students Helped' },
  { value: '25+', label: 'Countries' },
  { value: '4.8', label: 'App Rating' },
]

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    university: 'UT Austin',
    country: 'India',
    text: 'StudentNest helped me find an affordable apartment just 5 minutes from campus. The Indian grocery store recommendations were spot on!',
    rating: 5,
  },
  {
    name: 'Wei Chen',
    university: 'Stanford',
    country: 'China',
    text: 'I found my roommate, my favorite Chinese restaurant, and a badminton group all through this app. It made my transition so much smoother.',
    rating: 5,
  },
  {
    name: 'Ahmed Hassan',
    university: 'Georgia Tech',
    country: 'Egypt',
    text: 'The community feature connected me with other Egyptian students before I even arrived. They helped me with everything from airport pickup to furniture.',
    rating: 5,
  },
]

export default function Landing() {
  const { student } = useApp()

  return (
    <div>
      <section style={styles.hero}>
        <div className="landing-hero-inner" style={styles.heroInner}>
          <div style={styles.heroContent}>
            <div style={styles.heroBadge}>
              <Globe size={14} />
              <span>For International Students Worldwide</span>
            </div>
            <h1 className="landing-hero-title" style={styles.heroTitle}>
              Your New City.<br />
              <span style={styles.heroHighlight}>Your Complete Guide.</span>
            </h1>
            <p className="landing-hero-desc" style={styles.heroDesc}>
              Moving to a new country for studies? StudentNest finds you affordable housing, 
              home food, community groups, and sports activities — all based on your college location 
              and nationality.
            </p>
            <div className="landing-hero-btns" style={styles.heroBtns}>
              <Link
                to={student ? '/dashboard' : '/register'}
                className="btn btn-primary btn-lg"
              >
                {student ? 'Go to Dashboard' : 'Get Started Free'}
                <ArrowRight size={18} />
              </Link>
              {!student && (
                <Link to="/login" className="btn btn-secondary btn-lg">
                  I Have an Account
                </Link>
              )}
            </div>
            <div className="landing-hero-trust" style={styles.heroTrust}>
              <div style={styles.heroAvatars}>
                {['P', 'W', 'A', 'M'].map((letter, i) => (
                  <div key={i} style={{
                    ...styles.heroAvatar,
                    marginLeft: i > 0 ? -8 : 0,
                    background: ['#0f766e', '#7c3aed', '#ea580c', '#0369a1'][i],
                    zIndex: 4 - i,
                  }}>
                    {letter}
                  </div>
                ))}
              </div>
              <span style={styles.heroTrustText}>Trusted by 10,000+ international students</span>
            </div>
          </div>
          <div className="landing-hero-visual" style={styles.heroVisual}>
            <div style={styles.heroCard}>
              <div style={styles.heroCardHeader}>
                <MapPin size={18} color="#0f766e" />
                <span>Near University of Texas at Austin</span>
              </div>
              <div style={styles.heroCardItem}>
                <div style={styles.heroCardDot} />
                <div>
                  <div style={styles.heroCardItemTitle}>Studio Apartment - Oak Street</div>
                  <div style={styles.heroCardItemMeta}>0.3 mi · $650/mo · 4.7 ★</div>
                </div>
              </div>
              <div style={styles.heroCardItem}>
                <div style={{ ...styles.heroCardDot, background: '#ea580c' }} />
                <div>
                  <div style={styles.heroCardItemTitle}>Taj Kitchen - Indian Restaurant</div>
                  <div style={styles.heroCardItemMeta}>0.5 mi · $$/meal · 4.8 ★</div>
                </div>
              </div>
              <div style={styles.heroCardItem}>
                <div style={{ ...styles.heroCardDot, background: '#7c3aed' }} />
                <div>
                  <div style={styles.heroCardItemTitle}>Indian Students Association</div>
                  <div style={styles.heroCardItemMeta}>340 members · Weekly meetups</div>
                </div>
              </div>
              <div style={styles.heroCardItem}>
                <div style={{ ...styles.heroCardDot, background: '#0369a1' }} />
                <div>
                  <div style={styles.heroCardItemTitle}>Campus Cricket League</div>
                  <div style={styles.heroCardItemMeta}>Free · All levels · Sat/Sun</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.stats}>
        <div className="landing-stats-inner" style={styles.statsInner}>
          {STATS.map((stat, i) => (
            <div key={i} style={styles.statItem}>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.features}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <span style={styles.sectionBadge}>Everything You Need</span>
            <h2 style={styles.sectionTitle}>One App. Complete Settlement.</h2>
            <p style={styles.sectionDesc}>
              Stop juggling 10 different apps. StudentNest brings everything an international student needs into one place.
            </p>
          </div>
          <div className="landing-features-grid" style={styles.featuresGrid}>
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} style={styles.featureCard}>
                  <div style={{ ...styles.featureIcon, background: feature.bg, color: feature.color }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDesc}>{feature.desc}</p>
                  <div style={styles.featureLink}>
                    Learn more <ChevronRight size={14} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section style={styles.howItWorks}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <span style={styles.sectionBadge}>Simple Process</span>
            <h2 style={styles.sectionTitle}>How It Works</h2>
          </div>
          <div className="landing-steps-grid" style={styles.stepsGrid}>
            {[
              { step: '01', title: 'Register', desc: 'Enter your name, email, college, and nationality. Takes 30 seconds.' },
              { step: '02', title: 'We Search', desc: 'Our system finds all nearby affordable options based on your college address.' },
              { step: '03', title: 'Explore', desc: 'Browse housing, food, communities, and sports — all with reviews and contacts.' },
              { step: '04', title: 'Settle In', desc: 'Contact landlords, join groups, and start living your best student life.' },
            ].map((item, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepNumber}>{item.step}</div>
                <h3 style={styles.stepTitle}>{item.title}</h3>
                <p style={styles.stepDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.testimonials}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <span style={styles.sectionBadge}>Student Stories</span>
            <h2 style={styles.sectionTitle}>Loved by Students Worldwide</h2>
          </div>
          <div className="landing-testimonial-grid" style={styles.testimonialGrid}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={styles.testimonialCard}>
                <div style={styles.testimonialStars}>
                  {Array.from({ length: t.rating }, (_, j) => (
                    <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p style={styles.testimonialText}>"{t.text}"</p>
                <div style={styles.testimonialAuthor}>
                  <div style={styles.testimonialAvatar}>{t.name.charAt(0)}</div>
                  <div>
                    <div style={styles.testimonialName}>{t.name}</div>
                    <div style={styles.testimonialMeta}>{t.university} · from {t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.cta}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={styles.ctaTitle}>Ready to Feel at Home?</h2>
          <p style={styles.ctaDesc}>
            Join thousands of international students who found their perfect setup through StudentNest.
          </p>
          <Link to="/register" className="btn btn-accent btn-lg" style={{ marginTop: 24 }}>
            Create Free Account <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer style={styles.footer}>
        <div className="container">
          <div className="landing-footer-inner" style={styles.footerInner}>
            <div style={styles.footerLeft}>
              <div style={styles.footerLogo}>
                <div style={styles.footerLogoIcon}>SN</div>
                <span style={styles.footerLogoText}>StudentNest</span>
              </div>
              <p style={styles.footerTagline}>Helping international students feel at home, anywhere in the world.</p>
            </div>
            <div className="landing-footer-links" style={styles.footerLinks}>
              <div style={styles.footerCol}>
                <h4 style={styles.footerColTitle}>Product</h4>
                <a href="#" style={styles.footerLink}>Housing</a>
                <a href="#" style={styles.footerLink}>Food & Grocery</a>
                <a href="#" style={styles.footerLink}>Community</a>
                <a href="#" style={styles.footerLink}>Sports</a>
              </div>
              <div style={styles.footerCol}>
                <h4 style={styles.footerColTitle}>Company</h4>
                <a href="#" style={styles.footerLink}>About</a>
                <a href="#" style={styles.footerLink}>Careers</a>
                <a href="#" style={styles.footerLink}>Blog</a>
                <a href="#" style={styles.footerLink}>Contact</a>
              </div>
              <div style={styles.footerCol}>
                <h4 style={styles.footerColTitle}>Legal</h4>
                <a href="#" style={styles.footerLink}>Privacy</a>
                <a href="#" style={styles.footerLink}>Terms</a>
              </div>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} StudentNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 50%, #f5f3ff 100%)',
    padding: '100px 0 60px',
    overflow: 'hidden',
  },
  heroInner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    gap: 60,
  },
  heroContent: {
    flex: 1,
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 14px',
    borderRadius: 100,
    background: '#f0fdfa',
    border: '1px solid #99f6e4',
    color: '#0f766e',
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 20,
  },
  heroTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 52,
    fontWeight: 800,
    lineHeight: 1.1,
    color: '#0f172a',
    marginBottom: 20,
  },
  heroHighlight: {
    background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroDesc: {
    fontSize: 18,
    lineHeight: 1.7,
    color: '#475569',
    marginBottom: 32,
    maxWidth: 520,
  },
  heroBtns: {
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap',
    marginBottom: 32,
  },
  heroTrust: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  heroAvatars: {
    display: 'flex',
  },
  heroAvatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
    border: '2px solid white',
    position: 'relative',
  },
  heroTrustText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: 500,
  },
  heroVisual: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  heroCard: {
    background: 'white',
    borderRadius: 20,
    padding: 24,
    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
    width: '100%',
    maxWidth: 400,
  },
  heroCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 13,
    fontWeight: 600,
    color: '#0f766e',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: '1px solid #f1f5f9',
  },
  heroCardItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '12px 0',
  },
  heroCardDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: '#0f766e',
    marginTop: 5,
    flexShrink: 0,
  },
  heroCardItemTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: 2,
  },
  heroCardItemMeta: {
    fontSize: 12,
    color: '#94a3b8',
  },
  stats: {
    background: 'white',
    borderTop: '1px solid #f1f5f9',
    borderBottom: '1px solid #f1f5f9',
    padding: '40px 0',
  },
  statsInner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'center',
    gap: 80,
    flexWrap: 'wrap',
  },
  statItem: {
    textAlign: 'center',
  },
  statValue: {
    fontFamily: 'var(--font-display)',
    fontSize: 36,
    fontWeight: 700,
    color: '#0f766e',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  features: {
    padding: '80px 0',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: 48,
  },
  sectionBadge: {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: 100,
    background: '#f0fdfa',
    color: '#0f766e',
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 36,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 12,
  },
  sectionDesc: {
    fontSize: 16,
    color: '#64748b',
    maxWidth: 560,
    margin: '0 auto',
    lineHeight: 1.6,
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24,
  },
  featureCard: {
    background: 'white',
    borderRadius: 16,
    padding: 28,
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 8,
    fontFamily: 'var(--font-display)',
  },
  featureDesc: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#64748b',
    marginBottom: 16,
  },
  featureLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 13,
    fontWeight: 600,
    color: '#0f766e',
  },
  howItWorks: {
    padding: '80px 0',
    background: '#f8fafc',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24,
  },
  stepCard: {
    textAlign: 'center',
    padding: 24,
  },
  stepNumber: {
    fontFamily: 'var(--font-display)',
    fontSize: 48,
    fontWeight: 800,
    color: '#e2e8f0',
    marginBottom: 12,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 8,
    fontFamily: 'var(--font-display)',
  },
  stepDesc: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#64748b',
  },
  testimonials: {
    padding: '80px 0',
  },
  testimonialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
  },
  testimonialCard: {
    background: 'white',
    borderRadius: 16,
    padding: 28,
    border: '1px solid #e2e8f0',
  },
  testimonialStars: {
    display: 'flex',
    gap: 2,
    marginBottom: 14,
  },
  testimonialText: {
    fontSize: 15,
    lineHeight: 1.7,
    color: '#475569',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 700,
  },
  testimonialName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1e293b',
  },
  testimonialMeta: {
    fontSize: 12,
    color: '#94a3b8',
  },
  cta: {
    padding: '80px 0',
    background: 'linear-gradient(135deg, #0f766e, #0d5c56)',
  },
  ctaTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 36,
    fontWeight: 700,
    color: 'white',
    marginBottom: 12,
  },
  ctaDesc: {
    fontSize: 16,
    color: '#99f6e4',
    maxWidth: 480,
    margin: '0 auto',
    lineHeight: 1.6,
  },
  footer: {
    background: '#0f172a',
    color: '#94a3b8',
    padding: '60px 0 0',
  },
  footerInner: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 60,
    flexWrap: 'wrap',
    paddingBottom: 40,
  },
  footerLeft: {
    maxWidth: 280,
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  footerLogoIcon: {
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
  footerLogoText: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 20,
    color: 'white',
  },
  footerTagline: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#64748b',
  },
  footerLinks: {
    display: 'flex',
    gap: 60,
    flexWrap: 'wrap',
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  footerColTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: 'white',
    marginBottom: 4,
  },
  footerLink: {
    fontSize: 13,
    color: '#64748b',
    textDecoration: 'none',
  },
  footerBottom: {
    borderTop: '1px solid #1e293b',
    padding: '20px 0',
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
  },
}

