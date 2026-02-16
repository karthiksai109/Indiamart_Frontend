import StarRating from './StarRating'
import { ThumbsUp } from 'lucide-react'

export default function ReviewCard({ review }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.authorRow}>
          <div style={styles.avatar}>
            {review.author.charAt(0)}
          </div>
          <div>
            <div style={styles.authorName}>{review.author}</div>
            <div style={styles.date}>{review.date}</div>
          </div>
        </div>
        <StarRating rating={review.rating} size={12} showValue={false} />
      </div>
      <p style={styles.text}>{review.text}</p>
      <div style={styles.footer}>
        <button style={styles.helpfulBtn}>
          <ThumbsUp size={13} />
          <span>Helpful ({review.helpful})</span>
        </button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    padding: 16,
    borderRadius: 10,
    background: '#f8fafc',
    border: '1px solid #f1f5f9',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  authorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 600,
  },
  authorName: {
    fontSize: 13,
    fontWeight: 600,
    color: '#1e293b',
  },
  date: {
    fontSize: 12,
    color: '#94a3b8',
  },
  text: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#475569',
  },
  footer: {
    marginTop: 10,
    display: 'flex',
  },
  helpfulBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '5px 10px',
    borderRadius: 6,
    background: 'transparent',
    border: '1px solid #e2e8f0',
    color: '#64748b',
    fontSize: 12,
    cursor: 'pointer',
  },
}
