import React, { useState, useEffect } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export default function App() {
  const [serverData, setServerData] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch data from server on component mount
  useEffect(() => {
    fetchDataFromServer()
  }, [])

  const fetchDataFromServer = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/data`)
      const data = await response.json()
      setServerData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const sendDataToServer = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Hello from client!'
        })
      })
      const data = await response.json()
      setResponseData(data)
    } catch (error) {
      console.error('Error sending data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className='text-3xl font-bold underline mb-8'>PFE Project - Client-Server Connection</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Data from Server:</h2>
        {serverData ? (
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Message:</strong> {serverData.message}</p>
            <p><strong>Data:</strong> {JSON.stringify(serverData.data)}</p>
          </div>
        ) : (
          <p>Loading data from server...</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Send Data to Server:</h2>
        <button
          onClick={sendDataToServer}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Message to Server'}
        </button>

        {responseData && (
          <div className="bg-green-100 p-4 rounded mt-4">
            <p><strong>Server Response:</strong></p>
            <p>Success: {responseData.success ? 'Yes' : 'No'}</p>
            <p>Received: {responseData.received}</p>
            <p>Timestamp: {responseData.timestamp}</p>
          </div>
        )}
      </div>
    </div>
  )
}
