import React, { useEffect, useState } from 'react'
import { useFilter } from '../context/FilterContext'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import { dataService } from '../services/dataService'
import { useData } from '../context/DataContext'

const DisplayHome = () => {
  const { activeFilter } = useFilter();

  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { albums: contextAlbums, songs: contextSongs } = useData()

  // Fetch albums and songs from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        const [albumsData, songsData] = await Promise.all([
          dataService.getAlbums(),
          dataService.getSongs()
        ])
        setAlbums(albumsData)
        setSongs(songsData)
      } catch (err) {
        console.error('Error loading data:', err)
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    document.title = 'T&H Music - Web Player';
  }, []);

  // Filter albums and songs based on active filter
  const isPodcast = (tags) => (tags ?? []).includes('podcasts')

  const filteredAlbums = albums.filter(album => {
    const tags = album.tags ?? []
    if (activeFilter === 'all') return true
    if (activeFilter === 'music') return !isPodcast(tags)
    if (activeFilter === 'podcasts') return isPodcast(tags)
    return tags.includes(activeFilter)
  })

  const filteredSongs = songs.filter(song => {
    const tags = song.tags ?? []
    if (activeFilter === 'all') return true
    if (activeFilter === 'music') return !isPodcast(tags)
    if (activeFilter === 'podcasts') return isPodcast(tags)
    return tags.includes(activeFilter)
  })

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Loading music...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center text-red-400">
        {error}
      </div>
    )
  }

  return (
    <div className='flex-1 overflow-auto '>
      <Navbar />
      <div className='p-8'>
        <div className='space-y-8'>
          {/* Albums Section */}
          {filteredAlbums.length > 0 && (
            <div>
              <h2 className='text-2xl font-bold text-white mb-4'>Albums</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
                {filteredAlbums.map((album) => (
                  <AlbumItem
                    key={album.id}
                    id={album.id}
                    name={album.name}
                    desc={album.description}
                    image={album.image_url}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Songs Section */}
          {filteredSongs.length > 0 && (
            <div>
              <h2 className='text-2xl font-bold text-white mb-4'>Songs</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
                {filteredSongs.map((song) => (
                  <SongItem
                    key={song.id}
                    id={song.id}
                    name={song.name}
                    desc={song.description}
                    image={song.image_url}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredAlbums.length === 0 && filteredSongs.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-gray-400 text-lg'>No {activeFilter === 'all' ? 'content' : activeFilter} found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DisplayHome
