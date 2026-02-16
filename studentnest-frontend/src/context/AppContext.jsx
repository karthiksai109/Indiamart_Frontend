import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

const COLLEGES_DB = [
  { name: "University of Texas at Austin", city: "Austin", state: "TX", country: "USA", lat: 30.2849, lng: -97.7341 },
  { name: "MIT", city: "Cambridge", state: "MA", country: "USA", lat: 42.3601, lng: -71.0942 },
  { name: "Stanford University", city: "Stanford", state: "CA", country: "USA", lat: 37.4275, lng: -122.1697 },
  { name: "Harvard University", city: "Cambridge", state: "MA", country: "USA", lat: 42.3770, lng: -71.1167 },
  { name: "University of Michigan", city: "Ann Arbor", state: "MI", country: "USA", lat: 42.2780, lng: -83.7382 },
  { name: "Georgia Tech", city: "Atlanta", state: "GA", country: "USA", lat: 33.7756, lng: -84.3963 },
  { name: "UCLA", city: "Los Angeles", state: "CA", country: "USA", lat: 34.0689, lng: -118.4452 },
  { name: "Columbia University", city: "New York", state: "NY", country: "USA", lat: 40.8075, lng: -73.9626 },
  { name: "University of Illinois Urbana-Champaign", city: "Champaign", state: "IL", country: "USA", lat: 40.1020, lng: -88.2272 },
  { name: "Purdue University", city: "West Lafayette", state: "IN", country: "USA", lat: 40.4237, lng: -86.9212 },
  { name: "Arizona State University", city: "Tempe", state: "AZ", country: "USA", lat: 33.4242, lng: -111.9281 },
  { name: "University of Washington", city: "Seattle", state: "WA", country: "USA", lat: 47.6553, lng: -122.3035 },
  { name: "Carnegie Mellon University", city: "Pittsburgh", state: "PA", country: "USA", lat: 40.4433, lng: -79.9436 },
  { name: "NYU", city: "New York", state: "NY", country: "USA", lat: 40.7295, lng: -73.9965 },
  { name: "University of Toronto", city: "Toronto", state: "ON", country: "Canada", lat: 43.6629, lng: -79.3957 },
  { name: "University of British Columbia", city: "Vancouver", state: "BC", country: "Canada", lat: 49.2606, lng: -123.2460 },
  { name: "University of Melbourne", city: "Melbourne", state: "VIC", country: "Australia", lat: -37.7983, lng: 144.9610 },
  { name: "University of Sydney", city: "Sydney", state: "NSW", country: "Australia", lat: -33.8882, lng: 151.1871 },
  { name: "Imperial College London", city: "London", state: "", country: "UK", lat: 51.4988, lng: -0.1749 },
  { name: "University of Oxford", city: "Oxford", state: "", country: "UK", lat: 51.7548, lng: -1.2544 },
  { name: "University of Cambridge", city: "Cambridge", state: "", country: "UK", lat: 52.2043, lng: 0.1149 },
  { name: "TU Munich", city: "Munich", state: "", country: "Germany", lat: 48.1497, lng: 11.5679 },
  { name: "ETH Zurich", city: "Zurich", state: "", country: "Switzerland", lat: 47.3763, lng: 8.5480 },
  { name: "NUS", city: "Singapore", state: "", country: "Singapore", lat: 1.2966, lng: 103.7764 },
]

const NATIONALITIES = [
  "Indian", "Chinese", "South Korean", "Vietnamese", "Taiwanese",
  "Japanese", "Nigerian", "Bangladeshi", "Nepali", "Pakistani",
  "Brazilian", "Mexican", "Colombian", "Saudi Arabian", "Iranian",
  "Turkish", "Indonesian", "Malaysian", "Thai", "Filipino",
  "Kenyan", "Ethiopian", "Ghanaian", "Egyptian", "Sri Lankan",
  "German", "French", "Italian", "Spanish", "Russian"
]

function getAllUsers() {
  const raw = localStorage.getItem('studentnest_users')
  return raw ? JSON.parse(raw) : []
}

function saveAllUsers(users) {
  localStorage.setItem('studentnest_users', JSON.stringify(users))
}

export function AppProvider({ children }) {
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem('studentnest_session')
    return saved ? JSON.parse(saved) : null
  })
  const [joinedGroups, setJoinedGroups] = useState(() => {
    const saved = localStorage.getItem('studentnest_joined')
    return saved ? JSON.parse(saved) : []
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (student) {
      localStorage.setItem('studentnest_session', JSON.stringify(student))
    } else {
      localStorage.removeItem('studentnest_session')
    }
  }, [student])

  useEffect(() => {
    localStorage.setItem('studentnest_joined', JSON.stringify(joinedGroups))
  }, [joinedGroups])

  const registerStudent = (data) => {
    const users = getAllUsers()
    const exists = users.find(u => u.email.toLowerCase() === data.email.toLowerCase())
    if (exists) return { error: 'An account with this email already exists. Please sign in.' }

    const college = COLLEGES_DB.find(c => c.name === data.collegeName)
    const studentData = {
      ...data,
      id: 'STU-' + Date.now().toString(36).toUpperCase(),
      college: college || { name: data.collegeName, city: data.city || 'Unknown', country: data.country || 'USA', lat: 0, lng: 0 },
      registeredAt: new Date().toISOString()
    }
    users.push(studentData)
    saveAllUsers(users)
    setStudent(studentData)
    return studentData
  }

  const loginWithEmail = (email, password) => {
    const users = getAllUsers()
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!found) return { error: 'No account found with this email. Please register first.' }
    if (found.password !== password) return { error: 'Incorrect password. Please try again.' }
    setStudent(found)
    return found
  }

  const logout = () => {
    setStudent(null)
  }

  const toggleJoinGroup = (groupId) => {
    setJoinedGroups(prev =>
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    )
  }

  const isGroupJoined = (groupId) => joinedGroups.includes(groupId)

  return (
    <AppContext.Provider value={{
      student,
      loading,
      setLoading,
      registerStudent,
      loginWithEmail,
      logout,
      colleges: COLLEGES_DB,
      nationalities: NATIONALITIES,
      toggleJoinGroup,
      isGroupJoined,
      joinedGroups,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
