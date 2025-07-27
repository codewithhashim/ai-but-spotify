import React, { useState, useContext } from 'react'
import { assets } from "../assets/assets"
import { useNavigate } from 'react-router-dom';
import { PlaylistContext } from '../context/PlaylistContext';
import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { toast } from 'sonner';
import CreatePlaylistModal from './CreatePlaylistModal';
import PlaylistItem from './PlaylistItem';
import SearchBar from './SearchBar';

const Sidebar = () => {
    const navigate = useNavigate();
    const { playlists } = useContext(PlaylistContext);
    const { isSignedIn, user } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreatePlaylist = () => {
        setIsModalOpen(true);
    };

    const getInitials = (user) => {
        if (!user) return '';

        // Try to construct name from fullName or firstName/lastName
        let name = user.fullName;
        if (!name && user.firstName && user.lastName) {
            name = `${user.firstName} ${user.lastName}`;
        }
        
        // Generate initials from name
        if (name) {
            const nameParts = name.split(' ').filter(Boolean);
            if (nameParts.length === 0) return '';
            const firstInitial = nameParts[0][0];
            const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';
            return `${firstInitial}${lastInitial}`.toUpperCase();
        }

        // Fallback to email initial
        if (user.primaryEmailAddress) {
            return user.primaryEmailAddress.emailAddress[0].toUpperCase();
        }
        
        return 'U'; // Final fallback
    }

    return (
        <>
            <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
                <div className='bg-[#121212] rounded flex flex-col p-4 gap-4'>
                    <SearchBar />
                    <div className='flex flex-col gap-3'>
                        <div onClick={()=>navigate("/")} className='flex items-center gap-3 cursor-pointer'>
                            <img className='w-6' src={assets.thmusic_logo} alt="" />
                            <p className='font-bold'>Home</p>
                        </div>
                      
                    </div>
                </div>
                
                {/* Auth / Profile */}
                <div className='bg-[#121212] p-4 rounded mb-2'>
                    {isSignedIn ? (
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4'>
                                {isSignedIn && user ? (
                                    <div className='flex items-center gap-3'>
                                        <div className='w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center'>
                                            <span className='text-black font-bold text-sm'>{getInitials(user)}</span>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-sm font-medium'>Profile</span>
                                            <span className='text-xs text-gray-400'>Signed In</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex items-center gap-3'>
                                        <div className='w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center'>
                                            <span className='text-black font-bold text-sm'>U</span>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-sm font-medium'>Profile</span>
                                            <span className='text-xs text-gray-400'>Signed In</span>
                                        </div>
                                    </div>
                                )}
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: 'w-8 h-8',
                                            userButtonPopoverCard: 'bg-gray-900 border-gray-700',
                                            userButtonPopoverActionButton: 'text-white hover:bg-gray-800',
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-3'>
                            <SignInButton mode='modal'>
                                <button className='px-4 py-2 bg-green-600 rounded-full hover:bg-green-700'>Sign In</button>
                            </SignInButton>
                            <SignUpButton mode='modal'>
                                <button className='px-4 py-2 border border-gray-600 rounded-full hover:bg-gray-800'>Create Account</button>
                            </SignUpButton>
                        </div>
                    )}
                </div>
                <div className='bg-[#121212] flex-1 rounded overflow-hidden'>
                    <div className='p-4 flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <img className='w-8' src={assets.stack_icon} alt="" />
                            <p className='font-semibold'>Your Library</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <img 
                                onClick={handleCreatePlaylist}
                                className='w-5 cursor-pointer hover:opacity-70' 
                                src={assets.plus_icon} 
                                alt="" 
                            />
                        </div>
                    </div>
                    
                    {playlists.length === 0 ? (
                        <>
                            <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                                <h1>Create your first playlist</h1>
                                <p className='font-light'>it's easy we will help you</p>
                                <button 
                                    onClick={handleCreatePlaylist}
                                    className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 hover:bg-gray-200 transition-colors'
                                >
                                    Create Playlist
                                </button>
                            </div>
                            
                        </>
                    ) : (
                        <div className='px-2 pb-4 overflow-y-auto max-h-[calc(85%-80px)]'>
                            {playlists.map((playlist) => (
                                <PlaylistItem key={playlist.id} playlist={playlist} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            <CreatePlaylistModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </>
    )
}

export default Sidebar
