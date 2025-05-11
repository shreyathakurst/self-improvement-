"use client"

import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        try {
          // Set the auth token for all axios requests
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

          // Verify token and get user data
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/user`)
          setUser(res.data)
        } catch (err) {
          // If token is invalid, remove it
          localStorage.removeItem("token")
          delete axios.defaults.headers.common["Authorization"]
        }
      }

      setLoading(false)
    }

    checkLoggedIn()
  }, [])

  // Register user
  const register = async (userData) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, userData)
      localStorage.setItem("token", res.data.token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`
      setUser(res.data.user)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      }
    }
  }

  // Login user
  const login = async (userData) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, userData)
      localStorage.setItem("token", res.data.token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`
      setUser(res.data.user)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      }
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
    setUser(null)
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
