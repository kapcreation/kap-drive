import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Container } from '@mui/material'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuth } from './contexts/AuthContext'
import ForgotPassword from './pages/ForgotPassoword'

function App() {
  const { currentUser } = useAuth()

  const Layout = () => {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Outlet />
        </Container>
        <Footer />
      </>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if(!currentUser) return <Navigate to='/login' />

    return children
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route 
              index 
              element={<Navigate to='/my-drive' />} 
            />
            <Route 
              path='my-drive'
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
            />
            <Route 
              path='folders/:folderId'
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
            />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
