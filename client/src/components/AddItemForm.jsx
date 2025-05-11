"use client"

import { useState } from "react"

const AddItemForm = ({ onAdd }) => {
  const [text, setText] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (text.trim() === "") {
      setError("Item text cannot be empty")
      return
    }

    setIsLoading(true)
    setError("")

    const result = await onAdd(text)

    setIsLoading(false)

    if (result.success) {
      setText("")
    } else {
      setError(result.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

      <div className="flex flex-col sm:flex-row gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input flex-grow"
          placeholder="Enter a new improvement item..."
          rows="2"
        ></textarea>

        <button type="submit" className="btn btn-primary sm:self-end" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Item"}
        </button>
      </div>
    </form>
  )
}

export default AddItemForm
