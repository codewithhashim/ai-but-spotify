import { createContext, useState, useEffect, useContext } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { playlistService } from "../services/dataService";

const PlaylistContext = createContext();

function PlaylistContextProvider(props) {
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  // Load user playlists on mount and when user changes
  useEffect(() => {
    if (isSignedIn && user && getToken) {
      loadUserPlaylists();
    } else {
      setPlaylists([]);
    }
  }, [isSignedIn, user, getToken]);

  const loadUserPlaylists = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (user && getToken) {
        const userPlaylists = await playlistService.getUserPlaylists(user.id, getToken);
        setPlaylists(userPlaylists);
      }
    } catch (err) {
      console.error('Error loading playlists:', err);
      setError('Failed to load playlists');
    } finally {
      setLoading(false);
    }
  };

  const createPlaylist = async (name, description = '', imageUrl = null) => {
    try {
      if (!isSignedIn || !user || !getToken) {
        throw new Error('User not authenticated');
      }

      const playlistData = {
        name: name || `Playlist ${playlists.length + 1}`,
        description: description || 'Your custom playlist',
        image_url: imageUrl || '/default-playlist.jpg',
        is_public: false
      };

      const newPlaylist = await playlistService.createPlaylist(user.id, playlistData, getToken);
      if (newPlaylist) {
        setPlaylists(prev => [...prev, newPlaylist]);
        return newPlaylist;
      }
      return null;
    } catch (err) {
      console.error('Error creating playlist:', err);
      setError('Failed to create playlist');
      return null;
    }
  };

  const deletePlaylist = async (playlistId) => {
    try {
      if (!getToken) {
        throw new Error('No session available');
      }
      
      const success = await playlistService.deletePlaylist(playlistId, getToken);
      if (success) {
        setPlaylists(prev => prev.filter(playlist => playlist.id !== playlistId));
        if (currentPlaylist?.id === playlistId) {
          setCurrentPlaylist(null);
        }
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error deleting playlist:', err);
      setError('Failed to delete playlist');
      return false;
    }
  };

  const addSongToPlaylist = async (playlistId, songId) => {
    try {
      if (!getToken) {
        throw new Error('No session available');
      }
      
      const success = await playlistService.addSongToPlaylist(playlistId, songId, getToken);
      if (success) {
        // Refresh the playlist to get updated data
        const updatedPlaylist = await playlistService.getPlaylistWithSongs(playlistId, getToken);
        if (updatedPlaylist) {
          setPlaylists(prev => prev.map(playlist => 
            playlist.id === playlistId ? updatedPlaylist : playlist
          ));
        }
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error adding song to playlist:', err);
      setError('Failed to add song to playlist');
      return false;
    }
  };

  const removeSongFromPlaylist = async (playlistId, songId) => {
    try {
      if (!getToken) {
        throw new Error('No session available');
      }
      
      const success = await playlistService.removeSongFromPlaylist(playlistId, songId, getToken);
      if (success) {
        // Refresh the playlist to get updated data
        const updatedPlaylist = await playlistService.getPlaylistWithSongs(playlistId, getToken);
        if (updatedPlaylist) {
          setPlaylists(prev => prev.map(playlist => 
            playlist.id === playlistId ? updatedPlaylist : playlist
          ));
        }
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error removing song from playlist:', err);
      setError('Failed to remove song from playlist');
      return false;
    }
  };

  const updatePlaylist = async (playlistId, updates) => {
    try {
      if (!getToken) {
        throw new Error('No session available');
      }
      
      const updatedPlaylist = await playlistService.updatePlaylist(playlistId, updates, getToken);
      if (updatedPlaylist) {
        setPlaylists(prev => prev.map(playlist => 
          playlist.id === playlistId ? updatedPlaylist : playlist
        ));
        return updatedPlaylist;
      }
      return null;
    } catch (err) {
      console.error('Error updating playlist:', err);
      setError('Failed to update playlist');
      return null;
    }
  };

  const getPlaylistById = (playlistId) => {
    return playlists.find(playlist => playlist.id === playlistId);
  };

  const getPlaylistDuration = (playlist) => {
    if (!playlist || !playlist.playlist_songs) return 0;
    
    return playlist.playlist_songs.reduce((total, playlistSong) => {
      const song = playlistSong.songs;
      if (song && song.duration) {
        const [minutes, seconds] = song.duration.split(':').map(Number);
        return total + (minutes * 60) + seconds;
      }
      return total;
    }, 0);
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const value = {
    playlists,
    currentPlaylist,
    loading,
    error,
    setCurrentPlaylist,
    loadUserPlaylists,
    createPlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    updatePlaylist,
    getPlaylistById,
    getPlaylistDuration,
    formatDuration
  };

  return (
    <PlaylistContext.Provider value={value}>
      {props.children}
    </PlaylistContext.Provider>
  );
}

export { PlaylistContext, PlaylistContextProvider }; 