import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaylistContext } from '../context/PlaylistContext';
import { assets } from '../assets/assets';

const PlaylistItem = ({ playlist }) => {
  const navigate = useNavigate();
  const { formatDuration, getPlaylistDuration } = useContext(PlaylistContext);

  const handleClick = () => {
    navigate(`/playlist/${playlist.id}`);
  };

  const duration = formatDuration(getPlaylistDuration(playlist));
  // Support both `songs` (old) and `playlist_songs` (new) structures
  const songsArray = playlist.songs ?? (playlist.playlist_songs ? playlist.playlist_songs.map(ps => ps.songs) : []);
  const songCount = songsArray.length;

  return (
    <div 
      onClick={handleClick}
      className="flex items-center gap-3 p-2 hover:bg-[#ffffff1a] rounded cursor-pointer group"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center flex-shrink-0">
        {songsArray.length > 0 ? (
          <img 
            src={songsArray[0].image_url || songsArray[0].image} 
            alt={playlist.name}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <img 
            src={assets.stack_icon} 
            alt="Playlist"
            className="w-6 h-6 opacity-70"
          />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{playlist.name}</p>
        <p className="text-gray-400 text-sm truncate">
          {songCount} {songCount === 1 ? 'song' : 'songs'} • {duration}
        </p>
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          // Add delete functionality here if needed
        }}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[#ffffff1a] rounded"
      >
        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default PlaylistItem; 