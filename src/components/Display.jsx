import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import DisplayPlaylist from './DisplayPlaylist'
import DisplaySong from './DisplaySong'
import { albumsData } from '../assets/assets'

const Display = () => {
    
    const displayRef = useRef();
    const location = useLocation();
    const isAlbum = location.pathname.includes("album");
    const isPlaylist = location.pathname.includes("playlist");
    const isSong = location.pathname.includes("song");
    const albumId = isAlbum ? location.pathname.slice(-1) : "";
    const bgColor = albumsData[Number(albumId)]?.bgColor || "#121212";
    
    useEffect(()=> {
        if (isAlbum) {
            displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
        }
        else if (isPlaylist) {
            displayRef.current.style.background = `linear-gradient(#fce7f3, #121212)`
        }
        else if (isSong) {
            displayRef.current.style.background = `linear-gradient(#fce7f3, #121212)`
        }
        else {
            displayRef.current.style.background = "#121212"
        }
    },[isAlbum,isPlaylist,isSong,bgColor])

    return (
        <div ref={displayRef} className='flex-1 h-full overflow-auto p-4'>
            <Routes>
                <Route path='/' element={<DisplayHome />} />
                <Route path='/album/:id' element={<DisplayAlbum />} />
                <Route path='/playlist/:id' element={<DisplayPlaylist />} />
                <Route path='/song/:id' element={<DisplaySong />} />
            </Routes>
        </div>
    )
}

export default Display
