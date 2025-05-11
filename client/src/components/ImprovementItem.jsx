"use client"

import { useState } from "react"

const ImprovementItem = ({ item, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(item.text)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = async () => {
    if (text.trim() === "") {
      setError("Item text cannot be empty")
      return
    }

    setIsLoading(true)
    setError("")

    const result = await onEdit(item._id, text)

    setIsLoading(false)

    if (result.success) {
      setIsEditing(false)
    } else {
      setError(result.message)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setText(item.text)
    setError("")
  }

  return (
    <li className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
      {isEditing ? (
        <div>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

          <textarea value={text} onChange={(e) => setText(e.target.value)} className="input mb-3" rows="2"></textarea>

          <div className="flex justify-end space-x-2">
            <button onClick={handleCancel} className="btn btn-secondary text-sm" disabled={isLoading}>
              Cancel
            </button>
            <button onClick={handleEdit} className="btn btn-primary text-sm" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <p className="text-gray-800">{item.text}</p>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800"
              aria-label="Edit item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(item._id)}
              className="text-red-600 hover:text-red-800"
              aria-label="Delete item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </li>
  )
}

export default ImprovementItem
