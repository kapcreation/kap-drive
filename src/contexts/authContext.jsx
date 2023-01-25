import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "../firebase";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function signup(email, password) {
    setLoading(true)
    await createUserWithEmailAndPassword(auth, email, password)
  }
  
  async function login(email, password) {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
  }
  
  async function logout() {
    setLoading(true)
    await signOut(auth)
  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = { currentUser, signup, login, logout }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}