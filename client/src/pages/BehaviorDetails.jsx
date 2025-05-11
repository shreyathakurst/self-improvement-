"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import ImprovementItem from "../components/ImprovementItem"
import AddItemForm from "../components/AddItemForm"

const BehaviorDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [behavior, setBehavior] = useState(null)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch behavior and its items
  const fetchBehaviorDetails = async () => {
    setIsLoading(true)
    try {
      const [behaviorRes, itemsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/behaviors/${id}`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/behaviors/${id}/items`),
      ])

      setBehavior(behaviorRes.data)
      setItems(itemsRes.data)
      setError("")
    } catch (err) {
      setError("Failed to load behavior details. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBehaviorDetails()
  }, [id])

  // Add new item
  const handleAddItem = async (text) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/behaviors/${id}/items`, { text })
      setItems([...items, res.data])
      return { success: true }
    } catch (err) {
      console.error(err)
      return {
        success: false,
        message: err.response?.data?.message || "Failed to add item",
      }
    }
  }

  // Edit item
  const handleEditItem = async (itemId, text) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/items/${itemId}`, { text })
      setItems(items.map((item) => (item._id === itemId ? res.data : item)))
      return { success: true }
    } catch (err) {
      console.error(err)
      return {
        success: false,
        message: err.response?.data?.message || "Failed to update item",
      }
    }
  }

  // Delete item
  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/items/${itemId}`)
      setItems(items.filter((item) => item._id !== itemId))
    } catch (err) {
      setError("Failed to delete item. Please try again.")
      console.error(err)
    }
  }

  // Go back to homepage
  const handleGoBack = () => {
    navigate("/")
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 inline-block">{error}</div>
        <button onClick={handleGoBack} className="btn btn-primary mt-4">
          Go Back
        </button>
      </div>
    )
  }

  if (!behavior) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Behavior not found</h2>
        <button onClick={handleGoBack} className="btn btn-primary">
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={handleGoBack} className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Behaviors
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{behavior.name}</h1>
        {behavior.description && <p className="text-gray-600">{behavior.description}</p>}
      </div>

      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4">Add New Improvement Item</h2>
        <AddItemForm onAdd={handleAddItem} />
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Improvement Items</h2>

        {items.length > 0 ? (
          <ul className="space-y-3">
            {items.map((item) => (
              <ImprovementItem key={item._id} item={item} onEdit={handleEditItem} onDelete={handleDeleteItem} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">No improvement items yet. Add your first item above.</p>
        )}
      </div>
    </div>
  )
}

export default BehaviorDetails
