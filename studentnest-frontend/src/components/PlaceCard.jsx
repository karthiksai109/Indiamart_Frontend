import { useState } from 'react'
import StarRating from './StarRating'
import ReviewCard from './ReviewCard'
import { MapPin, Phone, Mail, Clock, ChevronDown, ChevronUp, CheckCircle, Navigation } from 'lucide-react'

export default function PlaceCard({ place, type = 'housing' }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={styles.card}>
      <div style={styles.imageWrap}>
        <img src={place.image} alt={place.name} style={styles.image} loading="lazy" />
        {place.verified && (
          <div style={styles.verifiedBadge}>
            <CheckCircle size={12} />
            <span>Verified</span>
          </div>
        )}
        {place.studentDiscount && (
          <div style={styles.discountBadge}>Student Discount</div>
        )}
      </div>

      <div style={styles.content}>
        <div style={styles.topRow}>
          <h3 style={styles.name}>{place.name}</h3>
          {type === 'housing' && place.price && (
            <div style={styles.price}>
              <span style={styles.priceValue}>${place.price}</span>
              <span style={styles.priceUnit}>{place.priceUnit}</span>
            </div>
          )}
          {type === 'food' && place.avgMealPrice && (
            <div style={styles.price}>
              <span style={styles.priceValue}>${place.avgMealPrice}</span>
              <span style={styles.priceUnit}>/meal avg</span>
            </div>
          )}
          {type === 'sports' && place.fee && (
            <div style={styles.fee}>{place.fee}</div>
          )}
        </div>

        <div style={styles.meta}>
          <div style={styles.metaItem}>
            <MapPin size={14} color="#64748b" />
            <span>{place.distance} mi away</span>
          </div>
          <div style={styles.ratingRow}>
            <StarRating rating={place.rating} size={13} />
            <span style={styles.reviewCount}>({place.reviewCount})</span>
          </div>
        </div>

        <p style={styles.address}>{place.address}</p>

        {place.amenities && (
          <div style={styles.tags}>
            {place.amenities.map((a, i) => (
              <span key={i} style={styles.tag}>{a}</span>
            ))}
          </div>
        )}

        {place.tags && (
          <div style={styles.tags}>
            {place.tags.map((t, i) => (
              <span key={i} style={styles.tag}>{t}</span>
            ))}
          </div>
        )}

        {place.schedule && (
          <div style={{ ...styles.metaItem, marginTop: 8 }}>
            <Clock size={14} color="#64748b" />
            <span>{place.schedule}</span>
          </div>
        )}

        {place.hours && (
          <div style={{ ...styles.metaItem, marginTop: 8 }}>
            <Clock size={14} color="#64748b" />
            <span>{place.hours}</span>
          </div>
        )}

        {type === 'housing' && (
          <div style={{
            ...styles.availBadge,
            background: place.available ? '#ecfdf5' : '#fef2f2',
            color: place.available ? '#047857' : '#dc2626',
          }}>
            {place.available ? 'Available Now' : 'Currently Occupied'}
          </div>
        )}

        <div style={styles.contactSection}>
          <div style={styles.contactRow}>
            <Phone size={14} color="var(--primary)" />
            <span>{place.contact.phone}</span>
          </div>
          {place.contact.email && (
            <div style={styles.contactRow}>
              <Mail size={14} color="var(--primary)" />
              <span>{place.contact.email}</span>
            </div>
          )}
          <div style={styles.contactName}>Contact: {place.contact.name}</div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          style={styles.expandBtn}
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <span>{expanded ? 'Hide Reviews' : `See Reviews (${place.reviews?.length || 0})`}</span>
        </button>

        {expanded && place.reviews && (
          <div style={styles.reviews}>
            {place.reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {place.upcomingEvents && place.upcomingEvents.length > 0 && (
          <div style={styles.eventsSection}>
            <h4 style={styles.eventsTitle}>Upcoming</h4>
            {place.upcomingEvents.map(event => (
              <div key={event.id} style={styles.eventItem}>
                <div style={styles.eventDot} />
                <div>
                  <div style={styles.eventName}>{event.name}</div>
                  <div style={styles.eventMeta}>
                    {event.date} {event.time && `at ${event.time}`}
                    {event.attendees && ` · ${event.attendees} going`}
                    {event.participants && ` · ${event.participants} participants`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: 'white',
    borderRadius: 16,
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  imageWrap: {
    position: 'relative',
    height: 200,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '4px 10px',
    borderRadius: 100,
    background: 'rgba(255,255,255,0.95)',
    color: '#047857',
    fontSize: 11,
    fontWeight: 600,
    backdropFilter: 'blur(4px)',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: '4px 10px',
    borderRadius: 100,
    background: '#f59e0b',
    color: 'white',
    fontSize: 11,
    fontWeight: 600,
  },
  content: {
    padding: 20,
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: 700,
    color: '#1e293b',
    fontFamily: 'var(--font-display)',
    lineHeight: 1.3,
  },
  price: {
    textAlign: 'right',
    flexShrink: 0,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 700,
    color: '#0f766e',
  },
  priceUnit: {
    fontSize: 12,
    color: '#64748b',
    display: 'block',
  },
  fee: {
    padding: '4px 12px',
    borderRadius: 100,
    background: '#ecfdf5',
    color: '#047857',
    fontSize: 13,
    fontWeight: 600,
    flexShrink: 0,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
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
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#94a3b8',
  },
  address: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 10,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    padding: '3px 10px',
    borderRadius: 100,
    background: '#f0fdfa',
    color: '#0f766e',
    fontSize: 11,
    fontWeight: 500,
  },
  availBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: 100,
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 12,
  },
  contactSection: {
    padding: 12,
    borderRadius: 10,
    background: '#f8fafc',
    marginBottom: 12,
  },
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 13,
    color: '#475569',
    marginBottom: 4,
  },
  contactName: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 6,
  },
  expandBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 0',
    background: 'transparent',
    border: 'none',
    color: 'var(--primary)',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
  },
  reviews: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 8,
  },
  eventsSection: {
    marginTop: 14,
    paddingTop: 14,
    borderTop: '1px solid #f1f5f9',
  },
  eventsTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1e293b',
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
    background: 'var(--primary)',
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
}
