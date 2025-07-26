import React, { useState } from 'react'
import { seedDatabase, isDatabaseSeeded } from '../utils/seedData'

const SeedDataButton = () => {
  const [isSeeding, setIsSeeding] = useState(false)
  const [isSeeded, setIsSeeded] = useState(false)
  const [message, setMessage] = useState('')

  const handleSeedDatabase = async () => {
    setIsSeeding(true)
    setMessage('')

    try {
      const success = await seedDatabase()
      if (success) {
        setMessage('✅ Database seeded successfully! Refresh the page to see the new data.')
        setIsSeeded(true)
      } else {
        setMessage('❌ Failed to seed database. Check the console for errors.')
      }
    } catch (error) {
      console.error('Error seeding database:', error)
      setMessage('❌ Error seeding database. Check the console for details.')
    } finally {
      setIsSeeding(false)
    }
  }

  const checkIfSeeded = async () => {
    try {
      const seeded = await isDatabaseSeeded()
      setIsSeeded(seeded)
      if (seeded) {
        setMessage('✅ Database already has data!')
      } else {
        setMessage('📝 Database is empty. Click the button to add sample data.')
      }
    } catch (error) {
      console.error('Error checking database:', error)
      setMessage('❌ Error checking database status.')
    }
  }

  // Check on component mount
  React.useEffect(() => {
    checkIfSeeded()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg max-w-sm">
        <h3 className="text-white font-semibold mb-2">Database Seeding</h3>
        
        {message && (
          <p className="text-sm text-gray-300 mb-3">{message}</p>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleSeedDatabase}
            disabled={isSeeding || isSeeded}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isSeeding || isSeeded
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isSeeding ? '🌱 Seeding...' : isSeeded ? '✅ Already Seeded' : '🌱 Seed Database'}
          </button>

          {isSeeded && (
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              🔄 Refresh
            </button>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-2">
          This will add 6 albums and 30 songs to your database
        </p>
      </div>
    </div>
  )
}

export default SeedDataButton 