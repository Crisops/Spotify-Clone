import { useState, useEffect } from 'react'
import { Slider } from './Slider'

const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0)

  const duration = audio?.current?.duration

  useEffect(() => {
    audio.current.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.current.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime)
  }

  const formatTime = (time) => {
    if (time == null) return '0:00'

    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (

    <div className='flex gap-x-2'>
      <span className='text-sm w-10 text-right'>{formatTime(currentTime)}</span>
      <Slider
        defaultValue={[0]}
        max={audio?.current?.duration ?? 0}
        min={0}
        value={[currentTime]}
        className='w-[400px]'
        onValueChange={(value) => {
          audio.current.currentTime = value
        }}
      />
      {duration ? <span className='text-sm w-10'>{formatTime(duration)}</span> : <span className='text-sm w-10'>0:00</span>}
    </div>

  )
}

export default SongControl
