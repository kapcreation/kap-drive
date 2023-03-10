import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }
  
  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = { currentUser, signup, login, logout, resetPassword }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}