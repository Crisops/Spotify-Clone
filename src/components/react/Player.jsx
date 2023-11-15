import { useRef, useEffect } from 'react'
import { usePlayerStore } from '../store/playerStore'
import CurrentSong from '@/components/react/CurrentSong'
import { Pause, Play } from './Icons'
import VolumenControl from './VolumenControl'
import SongControl from './SongControl'

const Player = () => {
  const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(state => state)

  const audioRef = useRef()

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    const { song, playlist } = currentMusic
    if (song) {
      const src = `/music/${playlist.id}/0${song.id}.mp3`
      audioRef.current.src = src
      audioRef.current.volume = volume
      audioRef.current.play()
    }
  }, [currentMusic])

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (

    <div className='flex flex-row justify-between items-center w-full h-full'>
      <div className='w-72'>
        <CurrentSong {...currentMusic.song} />
      </div>
      <div className=''>
        <audio ref={audioRef} />
        <div className='flex flex-col gap-2 justify-center items-center'>
          <button className='bg-white rounded-full p-2' onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <SongControl audio={audioRef} />
        </div>
      </div>
      <VolumenControl />
    </div>
  )
}

export default Player
