import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

export default function useWaveSurfer(url, playStatus, repeat, onFinish) {
  const containerRef = useRef(null)
  const wsRef = useRef(null)

  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)

  /** helper */
  const play = () => wsRef.current?.play()
  const pause = () => wsRef.current?.pause()
  const toggle = () => wsRef.current?.playPause()
  const seekTo = pct => wsRef.current?.seekTo(pct)
  const setVolume = v => wsRef.current?.setVolume(v)

  useEffect(() => {
    if (wsRef.current) {
      if (playStatus) {
        wsRef.current.play();
      } else {
        wsRef.current.pause();
      }
    }
  }, [playStatus]);

  useEffect(() => {
    if (!containerRef.current || !url) return

    // cleanup previous
    if (wsRef.current) {
      wsRef.current.destroy()
    }

    const ws = WaveSurfer.create({
      container: containerRef.current,
      url,
      waveColor: '#4a4a4a',
      progressColor: '#1db954',
      height: 40,
      barWidth: 2,
      cursorColor: 'transparent',
    })

    ws.on('ready', () => {
      setDuration(ws.getDuration())
      setReady(true)
      if (playStatus) {
        ws.play();
      }
    })

    ws.on('play', () => setPlaying(true))
    ws.on('pause', () => setPlaying(false))
    ws.on('timeupdate', () => setCurrent(ws.getCurrentTime()))
    ws.on('finish', () => {
      if (repeat) {
        ws.seekTo(0);
        ws.play();
      } else {
        setPlaying(false)
        if (onFinish) onFinish()
      }
    })

    wsRef.current = ws
    return () => ws.destroy()
  }, [url])

  return {
    containerRef,
    ready,
    playing,
    duration,
    current,
    play,
    pause,
    toggle,
    seekTo,
    setVolume,
  }
} 