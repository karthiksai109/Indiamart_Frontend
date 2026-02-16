import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PlaceCard from '../components/PlaceCard'
import SearchFilter from '../components/SearchFilter'
import { generateFoodData } from '../utils/mockData'
import { UtensilsCrossed, MapPin, ShoppingCart, Store } from 'lucide-react'

export default function Food() {
  const { student } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('distance')
  const [filterType, setFilterType] = useState('all')

  const allFood = useMemo(() => {
    if (!student) return []
    return generateFoodData(
      student.nationality,
      student.college?.city || 'City'
    )
  }, [student])

  const filtered = useMemo(() => {
    let results = [...allFood]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      results = results.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.address.toLowerCase().includes(q) ||
        f.cuisine?.toLowerCase().includes(q) ||
        f.tags?.some(t => t.toLowerCase().includes(q))
      )
    }

    if (filterType !== 'all') {
      if (filterType === 'restaurant') results = results.filter(f => f.type === 'restaurant')
      if (filterType === 'grocery') results = results.filter(f => f.type === 'grocery')
      if (filterType === 'discount') results = results.filter(f => f.studentDiscount)
      if (filterType === 'delivery') results = results.filter(f => f.deliveryAvailable)
    }

    switch (sortBy) {
      case 'distance': results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)); break
      case 'rating': results.sort((a, b) => b.rating - a.rating); break
      case 'price-low': results.sort((a, b) => (a.avgMealPrice || 0) - (b.avgMealPrice || 0)); break
    }

    return results
  }, [allFood, searchQuery, sortBy, filterType])

  if (!student) return null

  const restaurantCount = allFood.filter(f => f.type === 'restaurant').length
  const groceryCount = allFood.filter(f => f.type === 'grocery').length

  return (
    <div>
      <Navbar />
      <div className="container">
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>
              <UtensilsCrossed size={28} color="#ea580c" />
              {student.nationality} Food & Groceries
            </h1>
            <p style={styles.subtitle}>
              <MapPin size={14} /> Restaurants and grocery stores near {student.college?.name || student.collegeName}
            </p>
          </div>
        </div>

        <div className="page-stats-row" style={styles.statsRow}>
          <div style={styles.statCard}>
            <Store size={20} color="#ea580c" />
            <div>
              <div style={styles.statValue}>{restaurantCount}</div>
              <div style={styles.statLabel}>Restaurants</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <ShoppingCart size={20} color="#0f766e" />
            <div>
              <div style={styles.statValue}>{groceryCount}</div>
              <div style={styles.statLabel}>Grocery Stores</div>
            </div>
          </div>
        </div>

        <SearchFilter
          onSearch={setSearchQuery}
          onSort={setSortBy}
          placeholder="Search restaurants, grocery stores, cuisines..."
          sortOptions={[
            { value: 'distance', label: 'Nearest First' },
            { value: 'rating', label: 'Highest Rated' },
            { value: 'price-low', label: 'Price: Low to High' },
          ]}
        />

        <div style={styles.filters}>
          {[
            { key: 'all', label: 'All' },
            { key: 'restaurant', label: 'Restaurants' },
            { key: 'grocery', label: 'Grocery Stores' },
            { key: 'discount', label: 'Student Discount' },
            { key: 'delivery', label: 'Delivery Available' },
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
          {filtered.map(place => (
            <PlaceCard key={place.id} place={place} type="food" />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={styles.empty}>
            <UtensilsCrossed size={48} color="#d1d5db" />
            <h3 style={styles.emptyTitle}>No places found</h3>
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
    background: '#ea580c',
    color: 'white',
    borderColor: '#ea580c',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 24,
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
