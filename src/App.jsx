import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'
import { Toaster } from 'sonner'

const App = () => {
  const { track } = useContext(PlayerContext);

  return (
    <>
      <div className='h-screen bg-[#31183d]'>
        <div className='h-[90%] flex'>
          <Sidebar />
          <Display />
        </div>
        <Player />
        <Toaster position="bottom-center" richColors />
      </div>
    </>
  )
}

export default App
