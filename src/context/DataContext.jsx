import { createContext, useState, useEffect, useContext } from 'react'
import { dataService } from '../services/dataService'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [songs, setSongs] = useState([])
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load initial data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Load songs and albums in parallel
      const [songsData, albumsData] = await Promise.all([
        dataService.getSongs(),
        dataService.getAlbums()
      ])
      
      setSongs(songsData)
      setAlbums(albumsData)
    } catch (err) {
      console.error('Error loading data:', err)
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const searchSongs = async (query) => {
    if (!query.trim()) {
      return songs
    }
    
    try {
      const results = await dataService.searchSongs(query)
      return results
    } catch (err) {
      console.error('Error searching songs:', err)
      return []
    }
  }

  const searchContent = async (query) => {
    if (!query.trim()) {
      return { songs, albums }
    }
    try {
      const [songsRes, albumsRes] = await Promise.all([
        dataService.searchSongs(query),
        dataService.searchAlbums(query)
      ])
      return { songs: songsRes, albums: albumsRes }
    } catch (err) {
      console.error('Error searching content:', err)
      return { songs: [], albums: [] }
    }
  }

  const getSongById = async (id) => {
    try {
      return await dataService.getSongById(id)
    } catch (err) {
      console.error('Error getting song by ID:', err)
      return null
    }
  }

  const getAlbumById = async (id) => {
    try {
      return await dataService.getAlbumById(id)
    } catch (err) {
      console.error('Error getting album by ID:', err)
      return null
    }
  }

  const getSongsByAlbum = async (albumId) => {
    try {
      return await dataService.getSongsByAlbum(albumId)
    } catch (err) {
      console.error('Error getting songs by album:', err)
      return []
    }
  }

  const refreshData = () => {
    loadData()
  }

  const value = {
    songs,
    albums,
    loading,
    error,
    searchSongs,
    searchContent,
    getSongById,
    getAlbumById,
    getSongsByAlbum,
    refreshData
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export default DataProvider 