import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PlaceCard from '../components/PlaceCard'
import SearchFilter from '../components/SearchFilter'
import { generateHousingData } from '../utils/mockData'
import { Building2, MapPin } from 'lucide-react'

export default function Housing() {
  const { student } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('price-low')
  const [filterType, setFilterType] = useState('all')

  const allHousing = useMemo(() => {
    if (!student) return []
    return generateHousingData(
      student.college?.name || student.collegeName,
      student.college?.city || 'City'
    )
  }, [student])

  const filtered = useMemo(() => {
    let results = [...allHousing]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      results = results.filter(h =>
        h.name.toLowerCase().includes(q) ||
        h.address.toLowerCase().includes(q) ||
        h.amenities.some(a => a.toLowerCase().includes(q))
      )
    }

    if (filterType !== 'all') {
      if (filterType === 'available') results = results.filter(h => h.available)
      if (filterType === 'verified') results = results.filter(h => h.verified)
      if (filterType === 'shared') results = results.filter(h => h.type.toLowerCase().includes('shared') || h.type.toLowerCase().includes('room'))
      if (filterType === 'studio') results = results.filter(h => h.type.toLowerCase().includes('studio'))
    }

    switch (sortBy) {
      case 'price-low': results.sort((a, b) => a.price - b.price); break
      case 'price-high': results.sort((a, b) => b.price - a.price); break
      case 'rating': results.sort((a, b) => b.rating - a.rating); break
      case 'distance': results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)); break
    }

    return results
  }, [allHousing, searchQuery, sortBy, filterType])

  if (!student) return null

  return (
    <div>
      <Navbar />
      <div className="container">
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>
              <Building2 size={28} color="#0f766e" />
              Affordable Housing
            </h1>
            <p style={styles.subtitle}>
              <MapPin size={14} /> Near {student.college?.name || student.collegeName}, {student.college?.city}
            </p>
          </div>
          <div style={styles.resultCount}>
            {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'} found
          </div>
        </div>

        <SearchFilter
          onSearch={setSearchQuery}
          onSort={setSortBy}
          placeholder="Search by name, address, or amenity..."
          sortOptions={[
            { value: 'price-low', label: 'Price: Low to High' },
            { value: 'price-high', label: 'Price: High to Low' },
            { value: 'rating', label: 'Highest Rated' },
            { value: 'distance', label: 'Nearest First' },
          ]}
        />

        <div style={styles.filters}>
          {['all', 'available', 'verified', 'shared', 'studio'].map(f => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              style={{
                ...styles.filterBtn,
                ...(filterType === f ? styles.filterBtnActive : {})
              }}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="page-grid-2" style={styles.grid}>
          {filtered.map(place => (
            <PlaceCard key={place.id} place={place} type="housing" />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={styles.empty}>
            <Building2 size={48} color="#d1d5db" />
            <h3 style={styles.emptyTitle}>No listings found</h3>
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '36px 0 20px',
    flexWrap: 'wrap',
    gap: 16,
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
  resultCount: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: 500,
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
    background: '#0f766e',
    color: 'white',
    borderColor: '#0f766e',
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
