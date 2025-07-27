import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useData } from '../context/DataContext';
import { PlayerContext } from '../context/PlayerContext';
import { PlaylistContext } from '../context/PlaylistContext';
import { assets } from '../assets/assets';

const DisplaySong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playWithId } = useContext(PlayerContext);
  const { playlists, addSongToPlaylist } = useContext(PlaylistContext);
  const { getSongById } = useData();
  const [showDropdown, setShowDropdown] = useState(false);
  const [song, setSong] = useState(null)

  useEffect(() => {
    if (song) {
        document.title = `${song.name} by ${song.artist} - T&H Music`;
    }
    // Cleanup function to reset title when component unmounts
    return () => {
        document.title = 'T&H Music - Web Player';
    };
  }, [song]);

  useEffect(()=>{
     (async ()=>{
        const s = await getSongById(parseInt(id))
        setSong(s)
     })()
  },[id])

  if(!song){
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-64 text-white">Loading...</div>
      </>
    )
  }

  const handleAddToPlaylist = (playlistId) => {
    addSongToPlaylist(playlistId, song.id);
    setShowDropdown(false);
  };

  const handlePlay = () => {
    playWithId(song.id);
  };

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
          <img className="w-full h-full object-cover rounded" src={song.image} alt={song.name} />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-300 uppercase tracking-wider">Song</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{song.name}</h2>
          <h4 className="text-gray-300">{song.desc}</h4>
          <p className="mt-1 text-gray-300">
            <img className="inline-block w-5" src={assets.thmusic_logo} alt="" />
            <b className="text-white">
              T&H Music
            </b>
            • <b>{song.duration}</b>
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={handlePlay}
          className="bg-green-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <img className="w-6 h-6" src={assets.play_icon} alt="Play" />
          Play
        </button>
        
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-transparent border border-gray-600 text-white px-4 py-3 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <img className="w-5 h-5" src={assets.plus_icon} alt="Add to playlist" />
            Add to Playlist
          </button>
          
          {showDropdown && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-[#282828] rounded-lg shadow-lg border border-gray-700 z-50">
              <div className="p-2">
                <h3 className="text-white font-medium px-3 py-2">Add to playlist</h3>
                {playlists.length === 0 ? (
                  <p className="text-gray-400 px-3 py-2 text-sm">No playlists found. Create one first!</p>
                ) : (
                  <div className="max-h-48 overflow-y-auto">
                    {playlists.map((playlist) => (
                      <button
                        key={playlist.id}
                        onClick={() => handleAddToPlaylist(playlist.id)}
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
                            <img 
                              src={assets.stack_icon} 
                              alt="Playlist"
                              className="w-4 h-4 opacity-70"
                            />
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
      </div>

      <div className="mt-8">
        <h3 className="text-white text-xl font-semibold mb-4">About this song</h3>
        <div className="bg-[#181818] rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-2">Title</h4>
              <p className="text-gray-300">{song.name}</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Duration</h4>
              <p className="text-gray-300">{song.duration}</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Description</h4>
              <p className="text-gray-300">{song.desc}</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Category</h4>
              <p className="text-gray-300 capitalize">{song.tags?.join(', ') || 'Music'}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplaySong; 