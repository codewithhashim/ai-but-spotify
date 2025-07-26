import { useState, useContext, createContext, useCallback } from "react";
import { useData } from "./DataContext";

const PlayerContext = createContext();

function PlayerContextProvider(props) {
  const { songs } = useData();
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)

  const play = useCallback(() => {
    if (track) setPlayStatus(true);
  }, [track]);

  const pause = useCallback(() => {
    setPlayStatus(false);
  }, []);

  const playWithId = async (id) => {
    const song = songs.find(s => s.id === id);
    if (song) {
      setTrack(song);
      setPlayStatus(true);
    }
  };

  const selectRandomSong = () => {
    if (songs.length <= 1) return;
    const currentIndex = songs.findIndex(s => s.id === track.id);
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * songs.length);
    } while (nextIndex === currentIndex);
    setTrack(songs[nextIndex]);
    setPlayStatus(true);
  };

  const previous = async () => {
    if (!track || songs.length === 0) return;
    if (shuffle) {
      selectRandomSong();
      return;
    }
    const idx = songs.findIndex(s => s.id === track.id);
    if (idx > 0) {
      setTrack(songs[idx - 1]);
      setPlayStatus(true);
    }
  };

  const next = async () => {
    if (!track || songs.length === 0) return;
    if (shuffle) {
      selectRandomSong();
      return;
    }
    const idx = songs.findIndex(s => s.id === track.id);
    if (idx < songs.length - 1) {
      setTrack(songs[idx + 1]);
      setPlayStatus(true);
    } else {
      setTrack(songs[0]);
      setPlayStatus(true);
    }
  };

  const toggleShuffle = () => setShuffle(prev => !prev);
  const toggleRepeat  = () => setRepeat(prev => !prev);

  const contextValue = {
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    play,
    pause,
    playWithId,
    previous,
    next,
    shuffle,
    repeat,
    toggleShuffle,
    toggleRepeat,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
}

export { PlayerContext };
export default PlayerContextProvider;
