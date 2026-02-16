import { Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

export default function SearchFilter({ onSearch, onSort, placeholder = 'Search...', sortOptions = [] }) {
  const [query, setQuery] = useState('')

  const handleSearch = (val) => {
    setQuery(val)
    onSearch && onSearch(val)
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.searchBox}>
        <Search size={18} color="#94a3b8" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          style={styles.input}
        />
      </div>
      {sortOptions.length > 0 && (
        <div style={styles.sortBox}>
          <SlidersHorizontal size={16} color="#64748b" />
          <select
            onChange={(e) => onSort && onSort(e.target.value)}
            style={styles.select}
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    gap: 12,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  searchBox: {
    flex: 1,
    minWidth: 240,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 16px',
    borderRadius: 10,
    background: 'white',
    border: '1.5px solid #e2e8f0',
    transition: 'border-color 0.2s',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: 14,
    color: '#1e293b',
    background: 'transparent',
  },
  sortBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 16px',
    borderRadius: 10,
    background: 'white',
    border: '1.5px solid #e2e8f0',
  },
  select: {
    border: 'none',
    outline: 'none',
    fontSize: 14,
    color: '#1e293b',
    background: 'transparent',
    cursor: 'pointer',
  },
}
