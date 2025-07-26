import React, { useState, useEffect, useRef } from 'react'
import { useData } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const { searchContent } = useData()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ songs: [], albums: [] })
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const timeoutRef = useRef(null)
  const containerRef = useRef(null)

  // handle outside click to close dropdown
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(async () => {
      if (value.trim()) {
        const res = await searchContent(value)
        setResults(res)
        setShowDropdown(true)
      } else {
        setResults({ songs: [], albums: [] })
        setShowDropdown(false)
      }
    }, 400)
  }

  const handleSelect = (type, id) => {
    setQuery('')
    setShowDropdown(false)
    if (type === 'album') navigate(`/album/${id}`)
    else navigate(`/song/${id}`)
  }

  return (
    <div className="relative w-72" ref={containerRef}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search songs or albums..."
        className="w-full bg-[#242424] text-white placeholder-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
      />

      {showDropdown && (results.songs.length > 0 || results.albums.length > 0) && (
        <div className="absolute mt-1 w-full bg-[#181818] rounded shadow-lg max-h-72 overflow-y-auto z-50 border border-gray-700">
          {results.albums.length > 0 && (
            <div>
              <p className="text-xs uppercase text-gray-400 px-3 pt-3">Albums</p>
              {results.albums.map((album) => (
                <div
                  key={`alb-${album.id}`}
                  onClick={() => handleSelect('album', album.id)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[#2a2a2a] cursor-pointer"
                >
                  <img src={album.image_url} alt={album.name} className="w-10 h-10 object-cover rounded" />
                  <div>
                    <p className="text-sm text-white">{album.name}</p>
                    <p className="text-xs text-gray-400">Album</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results.songs.length > 0 && (
            <div>
              <p className="text-xs uppercase text-gray-400 px-3 pt-3">Songs</p>
              {results.songs.map((song) => (
                <div
                  key={`song-${song.id}`}
                  onClick={() => handleSelect('song', song.id)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[#2a2a2a] cursor-pointer"
                >
                  <img src={song.image_url} alt={song.name} className="w-10 h-10 object-cover rounded" />
                  <div>
                    <p className="text-sm text-white">{song.name}</p>
                    <p className="text-xs text-gray-400">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar 