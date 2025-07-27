import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { PlaylistContext } from '../context/PlaylistContext';
import { PlayerContext } from '../context/PlayerContext';
import { assets } from '../assets/assets';

const DisplayPlaylist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPlaylistById, getPlaylistDuration, formatDuration, removeSongFromPlaylist } = useContext(PlaylistContext);
  const { playWithId } = useContext(PlayerContext);

  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (playlist) {
      document.title = `${playlist.name} - T&H Music`;
    }
    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'T&H Music - Web Player';
    };
  }, [playlist]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const fetchedPlaylist = getPlaylistById(id);
        setPlaylist(fetchedPlaylist);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, getPlaylistById]);

  if (!playlist) {
    return null;
  }

  const totalDuration = formatDuration(getPlaylistDuration(playlist));
  const songCount = playlist.songs.length;

  const handleRemoveSong = (songId) => {
    removeSongFromPlaylist(playlist.id, songId);
  };

  const handleSongClick = (songId) => {
    navigate(`/song/${songId}`);
  };

  const handlePlayClick = (e, songId) => {
    e.stopPropagation();
    playWithId(songId);
  };

  return (
    <>
      <Navbar />
      <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
        <div className='w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center'>
          {playlist.songs.length > 0 ? (
            <img className='w-full h-full object-cover rounded' src={playlist.songs[0].image} alt="" />
          ) : (
            <img className='w-16 h-16 opacity-70' src={assets.stack_icon} alt="Playlist" />
          )}
        </div>
        <div className='flex flex-col'>
          <p className='text-sm text-gray-300 uppercase tracking-wider'>Playlist</p>
          <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{playlist.name}</h2>
          <h4 className='text-gray-300'>{playlist.description}</h4>
          <p className='mt-1 text-gray-300'>
            <img className='inline-block w-5' src={assets.thmusic_logo} alt="" />
            <b className='text-white'>
              T&H Music
            </b>
            • {songCount} {songCount === 1 ? 'song' : 'songs'}
            • <b>{totalDuration}</b>
          </p>
        </div>
      </div>

      {playlist.songs.length > 0 ? (
        <>
          <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
            <p><b className='mr-4'>#</b>Title</p>
            <p>Album</p>
            <p className='hidden sm:block'>Date Added</p>
            <img className='m-auto w-4' src={assets.clock_icon} alt="" />
          </div>
          <hr />
          {playlist.songs.map((song, index) => (
            <div key={song.id} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] group relative'>
              <div className='flex items-center'>
                <p className='text-white'>
                  <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                  <img className='inline w-10 mr-5' src={song.image} alt="" />
                  <span className="cursor-pointer hover:text-white transition-colors" onClick={() => handleSongClick(song.id)}>
                    {song.name}
                  </span>
                </p>
              </div>
              <p className='text-[15px]'>{song.desc}</p>
              <p className='text-[15px] hidden sm:block'>
                {new Date(playlist.updatedAt).toLocaleDateString()}
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
                    onClick={() => handleRemoveSong(song.id)}
                    className='opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[#ffffff1a] rounded'
                  >
                    <svg className='w-4 h-4 text-gray-400' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className='mt-10 text-center text-gray-400'>
          <p className='text-xl mb-2'>Your playlist is empty</p>
          <p className='text-sm'>Add some songs to get started!</p>
        </div>
      )}
    </>
  );
};

export default DisplayPlaylist; 