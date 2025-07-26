import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'
import useWaveSurfer from '../hooks/useWaveSurfer'

const fmt = (s) => {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

export default function Player() {
  const { track, previous, next, shuffle, repeat, toggleShuffle, toggleRepeat, playStatus, play, pause } = useContext(PlayerContext)
  const [vol, setVol] = useState(1)

  const {
    containerRef,
    duration,
    current,
    seekTo,
    setVolume,
  } = useWaveSurfer(track?.file_url, playStatus, repeat, next)

  if (!track) return (
    <footer className="h-[10%] bg-black text-gray-400 flex items-center px-6">
      Choose a song to start playing…
    </footer>
  )

  const onSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    seekTo(pct)
  }

  const onVol = (e) => {
    const v = +e.target.value / 100
    setVol(v)
    setVolume(v)
  }

  return (
    <footer className="h-[12%] bg-black text-white flex items-center p-4 gap-6">
      {/* left */}
      <div className="hidden lg:flex items-center gap-3 w-1/4">
        <img className={`w-12 h-12 rounded-full ${playStatus ? 'animate-spin-slow' : ''}`} src={track.image_url || assets.home_icon} alt="" />
        <div>
          <p className="font-medium">{track.name}</p>
          <p className="text-xs text-gray-400">{track.artist}</p>
        </div>
      </div>

      {/* centre */}
      <div className="flex-1 flex flex-col items-center">
        <div className="flex gap-5 mb-1 items-center">
        <img 
            onClick={toggleShuffle} 
            className={`w-5 cursor-pointer ${shuffle ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`} 
            src={assets.shuffle_icon} 
            alt="shuffle" 
            style={{ filter: shuffle ? 'invert(48%) sepia(94%) saturate(435%) hue-rotate(85deg) brightness(95%) contrast(92%)' : 'none' }}
          />
          <img onClick={previous} className="w-5 cursor-pointer" src={assets.prev_icon} alt="prev" />
          <img onClick={playStatus ? pause : play} className="w-6 cursor-pointer" src={playStatus ? assets.pause_icon : assets.play_icon} alt="play" />
          <img onClick={next} className="w-5 cursor-pointer" src={assets.next_icon} alt="next" />
          <img 
            onClick={toggleRepeat} 
            className={`w-5 cursor-pointer ${repeat ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`} 
            src={assets.loop_icon} 
            alt="repeat" 
            style={{ filter: repeat ? 'invert(48%) sepia(94%) saturate(435%) hue-rotate(85deg) brightness(95%) contrast(92%)' : 'none' }}
          />
        </div>

        <div className="flex items-center gap-3 w-full max-w-[600px] select-none">
          <span className="text-xs">{fmt(current)}</span>
          <div className="flex-1 cursor-pointer" onClick={onSeek}>
            <div ref={containerRef} />
          </div>
          <span className="text-xs">{fmt(duration)}</span>
        </div>
      </div>

      {/* right */}
      <div className="hidden lg:flex items-center gap-2 w-1/4 justify-end">
        <img className="w-5" src={assets.speaker_icon} alt="vol" />
        <input type="range" min="0" max="100" value={vol * 100} onChange={onVol} className="w-24 accent-green-500" />
      </div>
    </footer>
  )
}
