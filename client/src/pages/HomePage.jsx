"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import BehaviorCard from "../components/BehaviorCard"
import CreateBehaviorModal from "../components/CreateBehaviorModal"

const HomePage = () => {
  const [behaviors, setBehaviors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)

  // Fetch top behaviors
  const fetchBehaviors = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/behaviors/top`)
      setBehaviors(res.data)
      setError("")
    } catch (err) {
      setError("Failed to load behaviors. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBehaviors()
  }, [])

  // Delete behavior
  const handleDeleteBehavior = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this behavior? All associated improvement items will be deleted.")
    ) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/behaviors/${id}`)
        setBehaviors(behaviors.filter((behavior) => behavior._id !== id))
      } catch (err) {
        setError("Failed to delete behavior. Please try again.")
        console.error(err)
      }
    }
  }

  // Create new behavior
  const handleCreateBehavior = async (behaviorData) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/behaviors`, behaviorData)
      setBehaviors([...behaviors, { ...res.data, itemCount: 0 }])
      setShowModal(false)
      return { success: true }
    } catch (err) {
      console.error(err)
      return {
        success: false,
        message: err.response?.data?.message || "Failed to create behavior",
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Top Behaviors</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          New Behavior
        </button>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : behaviors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {behaviors.map((behavior) => (
            <BehaviorCard key={behavior._id} behavior={behavior} onDelete={handleDeleteBehavior} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h3 className="text-xl font-medium text-gray-700 mb-2">No behaviors yet</h3>
          <p className="text-gray-500 mb-6">Start by creating a new behavior to track</p>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            Create Your First Behavior
          </button>
        </div>
      )}

      {showModal && <CreateBehaviorModal onClose={() => setShowModal(false)} onCreate={handleCreateBehavior} />}
    </div>
  )
}

export default HomePage
