import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'
import { PlaylistContext } from '../context/PlaylistContext'
import { Card, CardContent } from './ui/card'

const SongItem = ({name,image,desc,id}) => {
    const navigate = useNavigate();
    const { track, playStatus, playWithId, play, pause } = useContext(PlayerContext)
    const { playlists, addSongToPlaylist } = useContext(PlaylistContext)
    const [showDropdown, setShowDropdown] = useState(false)

    const isCurrentTrack = track?.id === id;
    const isPlaying = isCurrentTrack && playStatus;

    const handleAddToPlaylist = (playlistId) => {
        addSongToPlaylist(playlistId, id);
        setShowDropdown(false);
    };

    const handleSongClick = () => {
        navigate(`/song/${id}`);
    };

    const handlePlayClick = (e) => {
        e.stopPropagation();
        if (isCurrentTrack) {
            if (isPlaying) {
                pause();
            } else {
                play();
            }
        } else {
            playWithId(id);
        }
    };

    return (
        <div className="relative">
            <Card 
                onClick={handleSongClick}
                className="group cursor-pointer bg-[#181818] border-[#282828] hover:bg-[#282828] transition-all duration-200 overflow-hidden"
            >
                <CardContent className="p-0">
                    <div className="relative aspect-square">
                        <img 
                            className={`w-full h-full object-cover rounded-full ${isPlaying ? 'animate-spin-slow' : ''}`} 
                            src={image} 
                            alt={name}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                            <div className={`transition-opacity duration-200 flex gap-2 ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                <button
                                    onClick={handlePlayClick}
                                    className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                                >
                                    {isPlaying ? (
                                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDropdown(!showDropdown);
                                    }}
                                    className="w-12 h-12 bg-black/80 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                                >
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 space-y-1">
                        <p className="font-bold text-white truncate">{name}</p>
                        <p className="text-slate-200 text-sm line-clamp-2">{desc}</p>
                    </div>
                </CardContent>
            </Card>
            
            {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#282828] rounded-lg shadow-lg border border-gray-700 z-50">
                    <div className="p-2">
                        <h3 className="text-white font-medium px-3 py-2">Add to playlist</h3>
                        {playlists.length === 0 ? (
                            <p className="text-gray-400 px-3 py-2 text-sm">No playlists found. Create one first!</p>
                        ) : (
                            <div className="max-h-48 overflow-y-auto">
                                {playlists.map((playlist) => {
                                    const songsArray = playlist.songs ?? (playlist.playlist_songs ? playlist.playlist_songs.map(ps => ps.songs) : []);
                                    const songCount = songsArray.length;
                                    return (
                                        <button
                                            key={playlist.id}
                                            onClick={() => handleAddToPlaylist(playlist.id)}
                                            className="w-full text-left px-3 py-2 hover:bg-[#3e3e3e] rounded text-white text-sm flex items-center gap-3"
                                        >
                                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center flex-shrink-0">
                                                {songCount > 0 ? (
                                                    <img 
                                                        src={songsArray[0]?.image_url || songsArray[0]?.image} 
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
                                                    {songCount} {songCount === 1 ? 'song' : 'songs'}
                                                </p>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SongItem