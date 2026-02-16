import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Housing from './pages/Housing'
import Food from './pages/Food'
import Community from './pages/Community'
import Sports from './pages/Sports'

function ProtectedRoute({ children }) {
  const { student } = useApp()
  if (!student) return <Navigate to="/login" replace />
  return children
}

function PublicRoute({ children }) {
  const { student } = useApp()
  if (student) return <Navigate to="/dashboard" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={
        <PublicRoute><Register /></PublicRoute>
      } />
      <Route path="/login" element={
        <PublicRoute><Login /></PublicRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/housing" element={
        <ProtectedRoute><Housing /></ProtectedRoute>
      } />
      <Route path="/food" element={
        <ProtectedRoute><Food /></ProtectedRoute>
      } />
      <Route path="/community" element={
        <ProtectedRoute><Community /></ProtectedRoute>
      } />
      <Route path="/sports" element={
        <ProtectedRoute><Sports /></ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  )
}
