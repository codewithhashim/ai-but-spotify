import React, { useContext, useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'
import { PlaylistContext } from '../context/PlaylistContext'
import { useData } from '../context/DataContext'

const DisplayAlbum = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const { playWithId } = useContext(PlayerContext);
    const { playlists, addSongToPlaylist } = useContext(PlaylistContext);
    const { getAlbumById, getSongsByAlbum } = useData();

    const [album, setAlbum] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        if (album) {
            document.title = `${album.name} - T&H Music`;
        }
        // Cleanup function to reset title when component unmounts
        return () => {
            document.title = 'T&H Music - Web Player';
        };
    }, [album]);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const alb = await getAlbumById(parseInt(id));
                const sngs = await getSongsByAlbum(parseInt(id));
                setAlbum(alb);
                setSongs(sngs);
            } catch (err) {
                console.error(err);
                setError('Failed to load album');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleAddToPlaylist = (playlistId, songId) => {
        addSongToPlaylist(playlistId, songId);
        setActiveDropdown(null);
    };

    const toggleDropdown = (songId) => {
        setActiveDropdown(activeDropdown === songId ? null : songId);
    };

    const handleSongClick = (songId) => {
        navigate(`/song/${songId}`);
    };

    const handlePlayClick = (e, songId) => {
        e.stopPropagation();
        playWithId(songId);
    };

  if (loading) {
      return (
          <>
            <Navbar />
            <div className='flex-1 flex items-center justify-center text-gray-400'>Loading...</div>
          </>
      );
  }

  if (error || !album) {
      return (
          <>
            <Navbar />
            <div className='flex-1 flex items-center justify-center text-red-400'>{error || 'Album not found'}</div>
          </>
      );
  }

  return (
    <>
            <Navbar />
        <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <div className='w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                    <img className='w-full h-full object-cover rounded-full' src={album.image_url} alt={album.name} />
                </div>
            <div className='flex flex-col'>
                    <p className='text-sm text-gray-300 uppercase tracking-wider'>Album</p>
                <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{album.name}</h2>
                    <h4 className='text-gray-300'>{album.description}</h4>
                    <p className='mt-1 text-gray-300'>
                    <img className='inline-block w-5' src={assets.thmusic_logo} alt="" />
                        <b className='text-white'>T&H Music</b>
                        • <b>Album</b>
                </p>
            </div>
        </div>

        <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
            <p><b className='mr-4'>#</b>Title</p>
            <p>Album</p>
            <p className='hidden sm:block'>Date Added</p>
            <img className='m-auto w-4' src={assets.clock_icon} alt="" />
        </div>
        <hr />
            {songs.map((song, index) => (
                <div key={song.id} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] group relative'>
                    <div className='flex items-center'>
                    <p className='text-white'>
                            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                            <img className='inline w-10 mr-5 rounded-full' src={song.image_url} alt="" />
                            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => handleSongClick(song.id)}>
                                {song.name}
                            </span>
                        </p>
                    </div>
                    <p className='text-[15px]'>{song.desc}</p>
                    <p className='text-[15px] hidden sm:block'>
                        {new Date().toLocaleDateString()}
                    </p>
                    <div className='flex items-center justify-between'>
                        <p className='text-[15px] text-center'>{song.duration}</p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => handlePlayClick(e, song.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[#ffffff1a] rounded"
                            >
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button
                                onClick={() => toggleDropdown(song.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[#ffffff1a] rounded"
                            >
                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    {activeDropdown === song.id && (
                        <div className="absolute top-full right-0 mt-1 w-64 bg-[#282828] rounded-lg shadow-lg border border-gray-700 z-50">
                            <div className="p-2">
                                <h3 className="text-white font-medium px-3 py-2">Add to playlist</h3>
                                {playlists.length === 0 ? (
                                    <p className="text-gray-400 px-3 py-2 text-sm">No playlists found. Create one first!</p>
                                ) : (
                                    <div className="max-h-48 overflow-y-auto">
                                        {playlists.map((playlist) => (
                                            <button
                                                key={playlist.id}
                                                onClick={() => handleAddToPlaylist(playlist.id, song.id)}
                                                className="w-full text-left px-3 py-2 hover:bg-[#3e3e3e] rounded text-white text-sm flex items-center gap-3"
                                            >
                                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center flex-shrink-0">
                                                    {playlist.songs.length > 0 ? (
                                                        <img 
                                                            src={playlist.songs[0].image} 
                                                            alt={playlist.name}
                                                            className="w-full h-full object-cover rounded"
                                                        />
                                                    ) : (
                                                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="truncate">{playlist.name}</p>
                                                    <p className="text-gray-400 text-xs truncate">
                                                        {playlist.songs.length} {playlist.songs.length === 1 ? 'song' : 'songs'}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
    </>
  )
}

export default DisplayAlbum
