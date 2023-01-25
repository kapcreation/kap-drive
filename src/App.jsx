import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Container } from '@mui/material'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuth } from './contexts/authContext'

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

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/my-drive' />
    },
    {
      path: '/',
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        {
          path: 'my-drive',
          element: <Dashboard />
        },
        {
          path: 'folders/:folderId',
          element: <Dashboard />
        },
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
  ])

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
