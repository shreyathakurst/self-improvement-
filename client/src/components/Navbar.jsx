"use client"

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Self Improvement
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-blue-700 rounded hover:bg-blue-800 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login" className="px-3 py-1 bg-blue-700 rounded hover:bg-blue-800 transition-colors">
                Login
              </Link>
              <Link to="/register" className="px-3 py-1 bg-blue-700 rounded hover:bg-blue-800 transition-colors">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
