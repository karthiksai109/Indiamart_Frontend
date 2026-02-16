import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PlaceCard from '../components/PlaceCard'
import SearchFilter from '../components/SearchFilter'
import { generateCommunityData } from '../utils/mockData'
import { Users, MapPin, MessageCircle, Calendar, UserPlus, UserMinus, Check } from 'lucide-react'

export default function Community() {
  const { student, toggleJoinGroup, isGroupJoined } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('members')
  const [filterType, setFilterType] = useState('all')

  const allCommunity = useMemo(() => {
    if (!student) return []
    return generateCommunityData(
      student.nationality,
      student.college?.city || 'City'
    )
  }, [student])

  const filtered = useMemo(() => {
    let results = [...allCommunity]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      results = results.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      )
    }

    if (filterType !== 'all') {
      results = results.filter(c => c.type.toLowerCase().includes(filterType.toLowerCase()))
    }

    switch (sortBy) {
      case 'members': results.sort((a, b) => b.members - a.members); break
      case 'rating': results.sort((a, b) => b.rating - a.rating); break
      case 'events': results.sort((a, b) => b.upcomingEvents.length - a.upcomingEvents.length); break
    }

    return results
  }, [allCommunity, searchQuery, sortBy, filterType])

  if (!student) return null

  const totalMembers = allCommunity.reduce((sum, c) => sum + c.members, 0)
  const totalEvents = allCommunity.reduce((sum, c) => sum + c.upcomingEvents.length, 0)

  return (
    <div>
      <Navbar />
      <div className="container">
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>
              <Users size={28} color="#7c3aed" />
              {student.nationality} Community
            </h1>
            <p style={styles.subtitle}>
              <MapPin size={14} /> Community groups and events in {student.college?.city}
            </p>
          </div>
        </div>

        <div className="page-stats-row" style={styles.statsRow}>
          <div style={styles.statCard}>
            <UserPlus size={20} color="#7c3aed" />
            <div>
              <div style={styles.statValue}>{totalMembers.toLocaleString()}</div>
              <div style={styles.statLabel}>Total Members</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <Calendar size={20} color="#0f766e" />
            <div>
              <div style={styles.statValue}>{totalEvents}</div>
              <div style={styles.statLabel}>Upcoming Events</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <MessageCircle size={20} color="#ea580c" />
            <div>
              <div style={styles.statValue}>{allCommunity.length}</div>
              <div style={styles.statLabel}>Active Groups</div>
            </div>
          </div>
        </div>

        <SearchFilter
          onSearch={setSearchQuery}
          onSort={setSortBy}
          placeholder="Search community groups, events..."
          sortOptions={[
            { value: 'members', label: 'Most Members' },
            { value: 'rating', label: 'Highest Rated' },
            { value: 'events', label: 'Most Events' },
          ]}
        />

        <div style={styles.filters}>
          {[
            { key: 'all', label: 'All Groups' },
            { key: 'cultural', label: 'Cultural' },
            { key: 'community', label: 'Community' },
            { key: 'student', label: 'Student Org' },
            { key: 'professional', label: 'Professional' },
            { key: 'social', label: 'Social' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilterType(f.key)}
              style={{
                ...styles.filterBtn,
                ...(filterType === f.key ? styles.filterBtnActive : {})
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="page-grid-2" style={styles.grid}>
          {filtered.map(group => (
            <div key={group.id} style={styles.card}>
              <div style={styles.cardImageWrap}>
                <img src={group.image} alt={group.name} style={styles.cardImage} loading="lazy" />
                <div style={styles.platformBadge}>{group.platform}</div>
              </div>
              <div style={styles.cardContent}>
                <div style={styles.cardType}>{group.type}</div>
                <h3 style={styles.cardName}>{group.name}</h3>
                <p style={styles.cardDesc}>{group.description}</p>

                <div style={styles.cardMeta}>
                  <span style={styles.metaItem}>
                    <Users size={14} /> {group.members.toLocaleString()} members
                  </span>
                  <span style={styles.metaItem}>
                    <Calendar size={14} /> {group.meetingFrequency}
                  </span>
                </div>

                <div style={styles.contactSection}>
                  <div style={styles.contactRow}>Contact: {group.contact.name}</div>
                  <div style={styles.contactRow}>{group.contact.phone}</div>
                  <div style={styles.contactRow}>{group.contact.email}</div>
                </div>

                {group.upcomingEvents.length > 0 && (
                  <div style={styles.eventsSection}>
                    <h4 style={styles.eventsTitle}>Upcoming Events</h4>
                    {group.upcomingEvents.map(event => (
                      <div key={event.id} style={styles.eventItem}>
                        <div style={styles.eventDot} />
                        <div>
                          <div style={styles.eventName}>{event.name}</div>
                          <div style={styles.eventMeta}>
                            {event.date} at {event.time} · {event.location}
                          </div>
                          <div style={styles.eventAttendees}>{event.attendees} going</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => toggleJoinGroup(group.id)}
                  style={isGroupJoined(group.id) ? styles.joinedBtn : styles.joinBtn}
                >
                  {isGroupJoined(group.id) ? (
                    <><Check size={16} /> Joined</>
                  ) : (
                    <><UserPlus size={16} /> Join Group</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={styles.empty}>
            <Users size={48} color="#d1d5db" />
            <h3 style={styles.emptyTitle}>No groups found</h3>
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
    background: '#7c3aed',
    color: 'white',
    borderColor: '#7c3aed',
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
  platformBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: '4px 12px',
    borderRadius: 100,
    background: 'rgba(255,255,255,0.95)',
    color: '#475569',
    fontSize: 12,
    fontWeight: 600,
    backdropFilter: 'blur(4px)',
  },
  cardContent: {
    padding: 20,
  },
  cardType: {
    fontSize: 11,
    fontWeight: 600,
    color: '#7c3aed',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 6,
  },
  cardName: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#64748b',
    marginBottom: 14,
  },
  cardMeta: {
    display: 'flex',
    gap: 16,
    marginBottom: 14,
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 13,
    color: '#64748b',
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
  contactRow: {
    fontSize: 13,
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
    background: '#7c3aed',
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
  eventAttendees: {
    fontSize: 11,
    color: '#7c3aed',
    fontWeight: 600,
  },
  joinBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    padding: '12px',
    borderRadius: 10,
    background: '#7c3aed',
    color: 'white',
    fontSize: 14,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  joinedBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    padding: '12px',
    borderRadius: 10,
    background: '#f0fdf4',
    color: '#16a34a',
    fontSize: 14,
    fontWeight: 600,
    border: '1.5px solid #bbf7d0',
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
