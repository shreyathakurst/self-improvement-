"use client"

import { Link } from "react-router-dom"

const BehaviorCard = ({ behavior, onDelete }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{behavior.name}</h3>
        <button
          onClick={() => onDelete(behavior._id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Delete behavior"
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

      <p className="text-gray-600 mb-4">{behavior.description || "No description provided"}</p>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {behavior.itemCount || 0} improvement {behavior.itemCount === 1 ? "item" : "items"}
        </div>
        <Link to={`/behavior/${behavior._id}`} className="btn btn-primary text-sm">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default BehaviorCard
