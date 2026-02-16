import { Star } from 'lucide-react'

export default function StarRating({ rating, size = 14, showValue = true }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{ display: 'flex', gap: 1 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={size}
            fill={i < fullStars ? '#f59e0b' : (i === fullStars && hasHalf ? '#f59e0b' : 'none')}
            color={i < fullStars || (i === fullStars && hasHalf) ? '#f59e0b' : '#d1d5db'}
            strokeWidth={1.5}
          />
        ))}
      </div>
      {showValue && (
        <span style={{ fontSize: size - 1, fontWeight: 600, color: '#1e293b' }}>
          {rating}
        </span>
      )}
    </div>
  )
}
