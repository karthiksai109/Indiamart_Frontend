import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PlaceCard from '../components/PlaceCard'
import SearchFilter from '../components/SearchFilter'
import { generateSportsData } from '../utils/mockData'
import { Trophy, MapPin, Users, Dumbbell, Calendar } from 'lucide-react'

export default function Sports() {
  const { student } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('distance')
  const [filterSport, setFilterSport] = useState('all')

  const allSports = useMemo(() => {
    if (!student) return []
    return generateSportsData(student.college?.city || 'City')
  }, [student])

  const sportTypes = useMemo(() => {
    const types = new Set(allSports.map(s => s.sport))
    return ['all', ...Array.from(types)]
  }, [allSports])

  const filtered = useMemo(() => {
    let results = [...allSports]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      results = results.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.sport.toLowerCase().includes(q) ||
        s.level.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q)
      )
    }

    if (filterSport !== 'all') {
      results = results.filter(s => s.sport === filterSport)
    }

    switch (sortBy) {
      case 'distance': results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)); break
      case 'rating': results.sort((a, b) => b.rating - a.rating); break
      case 'members': results.sort((a, b) => b.members - a.members); break
    }

    return results
  }, [allSports, searchQuery, sortBy, filterSport])

  if (!student) return null

  const totalMembers = allSports.reduce((sum, s) => sum + s.members, 0)
  const totalEvents = allSports.reduce((sum, s) => sum + s.upcomingEvents.length, 0)
  const freeCount = allSports.filter(s => s.fee.toLowerCase().includes('free')).length

  return (
    <div>
      <Navbar />
      <div className="container">
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>
              <Trophy size={28} color="#0369a1" />
              Sports & Activities
            </h1>
            <p style={styles.subtitle}>
              <MapPin size={14} /> Sports events and clubs near {student.college?.name || student.collegeName}
            </p>
          </div>
        </div>

        <div className="page-stats-row" style={styles.statsRow}>
          <div style={styles.statCard}>
            <Dumbbell size={20} color="#0369a1" />
            <div>
              <div style={styles.statValue}>{allSports.length}</div>
              <div style={styles.statLabel}>Sports Clubs</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <Users size={20} color="#7c3aed" />
            <div>
              <div style={styles.statValue}>{totalMembers.toLocaleString()}</div>
              <div style={styles.statLabel}>Active Players</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <Calendar size={20} color="#ea580c" />
            <div>
              <div style={styles.statValue}>{totalEvents}</div>
              <div style={styles.statLabel}>Upcoming Events</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <Trophy size={20} color="#0f766e" />
            <div>
              <div style={styles.statValue}>{freeCount}</div>
              <div style={styles.statLabel}>Free to Join</div>
            </div>
          </div>
        </div>

        <SearchFilter
          onSearch={setSearchQuery}
          onSort={setSortBy}
          placeholder="Search sports, clubs, activities..."
          sortOptions={[
            { value: 'distance', label: 'Nearest First' },
            { value: 'rating', label: 'Highest Rated' },
            { value: 'members', label: 'Most Popular' },
          ]}
        />

        <div style={styles.filters}>
          {sportTypes.map(sport => (
            <button
              key={sport}
              onClick={() => setFilterSport(sport)}
              style={{
                ...styles.filterBtn,
                ...(filterSport === sport ? styles.filterBtnActive : {})
              }}
            >
              {sport === 'all' ? 'All Sports' : sport}
            </button>
          ))}
        </div>

        <div className="page-grid-2" style={styles.grid}>
          {filtered.map(sport => (
            <div key={sport.id} style={styles.card}>
              <div style={styles.cardImageWrap}>
                <img src={sport.image} alt={sport.name} style={styles.cardImage} loading="lazy" />
                <div style={styles.sportBadge}>{sport.sport}</div>
                <div style={styles.levelBadge}>{sport.level}</div>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardName}>{sport.name}</h3>

                <div style={styles.cardMeta}>
                  <span style={styles.metaItem}>
                    <MapPin size={14} /> {sport.distance} mi
                  </span>
                  <span style={styles.metaItem}>
                    <Users size={14} /> {sport.members} members
                  </span>
                </div>

                <p style={styles.cardAddress}>{sport.address}</p>

                <div style={styles.detailsRow}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Schedule</span>
                    <span style={styles.detailValue}>{sport.schedule}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Fee</span>
                    <span style={{
                      ...styles.detailValue,
                      color: sport.fee.toLowerCase().includes('free') ? '#047857' : '#0f172a'
                    }}>{sport.fee}</span>
                  </div>
                </div>

                {sport.equipmentProvided && (
                  <div style={styles.equipBadge}>Equipment Provided</div>
                )}

                <div style={styles.contactSection}>
                  <div>Contact: {sport.contact.name}</div>
                  <div>{sport.contact.phone}</div>
                  <div>{sport.contact.email}</div>
                </div>

                {sport.upcomingEvents.length > 0 && (
                  <div style={styles.eventsSection}>
                    <h4 style={styles.eventsTitle}>Upcoming Events</h4>
                    {sport.upcomingEvents.map(event => (
                      <div key={event.id} style={styles.eventItem}>
                        <div style={styles.eventDot} />
                        <div>
                          <div style={styles.eventName}>{event.name}</div>
                          <div style={styles.eventMeta}>
                            {event.date} · {event.participants} participants
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button style={styles.joinBtn}>
                  Join Club
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={styles.empty}>
            <Trophy size={48} color="#d1d5db" />
            <h3 style={styles.emptyTitle}>No sports found</h3>
            <p style={styles.emptyDesc}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

const styles = {
  header: {
    padding: '36px 0 20px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 28,
    fontWeight: 700,
    color: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 14,
    color: '#64748b',
  },
  statsRow: {
    display: 'flex',
    gap: 16,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 20px',
    background: 'white',
    borderRadius: 12,
    border: '1px solid #e2e8f0',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 700,
    color: '#0f172a',
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  filters: {
    display: 'flex',
    gap: 8,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '8px 18px',
    borderRadius: 100,
    border: '1px solid #e2e8f0',
    background: 'white',
    color: '#64748b',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  filterBtnActive: {
    background: '#0369a1',
    color: 'white',
    borderColor: '#0369a1',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 24,
  },
  card: {
    background: 'white',
    borderRadius: 16,
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  cardImageWrap: {
    position: 'relative',
    height: 180,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  sportBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    padding: '4px 12px',
    borderRadius: 100,
    background: 'rgba(255,255,255,0.95)',
    color: '#0369a1',
    fontSize: 12,
    fontWeight: 600,
    backdropFilter: 'blur(4px)',
  },
  levelBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: '4px 12px',
    borderRadius: 100,
    background: '#0369a1',
    color: 'white',
    fontSize: 11,
    fontWeight: 600,
  },
  cardContent: {
    padding: 20,
  },
  cardName: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 8,
  },
  cardMeta: {
    display: 'flex',
    gap: 16,
    marginBottom: 8,
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 13,
    color: '#64748b',
  },
  cardAddress: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 14,
  },
  detailsRow: {
    display: 'flex',
    gap: 24,
    marginBottom: 12,
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 600,
    color: '#0f172a',
  },
  equipBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: 100,
    background: '#f0f9ff',
    color: '#0369a1',
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 12,
  },
  contactSection: {
    padding: 12,
    borderRadius: 10,
    background: '#f8fafc',
    marginBottom: 14,
    fontSize: 13,
    color: '#475569',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  eventsSection: {
    marginBottom: 14,
  },
  eventsTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#0f172a',
    marginBottom: 10,
  },
  eventItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#0369a1',
    marginTop: 5,
    flexShrink: 0,
  },
  eventName: {
    fontSize: 13,
    fontWeight: 600,
    color: '#1e293b',
  },
  eventMeta: {
    fontSize: 12,
    color: '#64748b',
  },
  joinBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    padding: '12px',
    borderRadius: 10,
    background: '#0369a1',
    color: 'white',
    fontSize: 14,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  empty: {
    textAlign: 'center',
    padding: '60px 0',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#475569',
    marginTop: 16,
  },
  emptyDesc: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 6,
  },
}
