import React, { useState, useContext } from 'react';
import { PlaylistContext } from '../context/PlaylistContext';

const CreatePlaylistModal = ({ isOpen, onClose }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const { createPlaylist } = useContext(PlaylistContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playlistName.trim()) {
      createPlaylist(playlistName.trim(), description.trim());
      setPlaylistName('');
      setDescription('');
      onClose();
    }
  };

  const handleCancel = () => {
    setPlaylistName('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#282828] rounded-lg p-6 w-96 max-w-[90vw]">
        <h2 className="text-2xl font-bold text-white mb-4">Create New Playlist</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="playlistName" className="block text-sm font-medium text-gray-300 mb-2">
              Playlist Name *
            </label>
            <input
              type="text"
              id="playlistName"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="w-full px-3 py-2 bg-[#3e3e3e] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
              placeholder="Enter playlist name"
              required
              autoFocus
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-[#3e3e3e] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-green-500 resize-none"
              placeholder="Add an optional description"
              rows="3"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-transparent border border-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!playlistName.trim()}
              className="flex-1 px-4 py-2 bg-green-500 text-black font-semibold rounded-full hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal; 