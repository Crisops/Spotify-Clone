import { useRef, useEffect } from 'react'
import { usePlayerStore } from '../store/playerStore'
import CurrentSong from '@/components/react/CurrentSong'
import { Pause, Play } from './Icons'
import VolumenControl from './VolumenControl'

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
    const { song, playlist, songs } = currentMusic
    if (song) {
      const src = `/music/${playlist.id}/0${song.id}.mp3`
      audioRef.current.src = src
      audioRef.current.value = volume
      audioRef.current.play()
    }
  }, [currentMusic])

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (

    <div className='flex flex-row justify-between items-center w-full h-full px-4'>
      <div>
        <CurrentSong {...currentMusic.song} />
      </div>
      <div className=''>
        <audio ref={audioRef} />
        <div className='flex justify-center'>
          <button className='bg-white rounded-full p-2' onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>
      <VolumenControl />
    </div>
  )
}

export default Player
