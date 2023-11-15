import { useRef } from 'react'

import { usePlayerStore } from '../store/playerStore'
import { Volumen, VolumenSilence } from './Icons'
import { Slider } from './Slider'

const VolumenControl = () => {
  const volume = usePlayerStore(state => state.volume)
  const setVolume = usePlayerStore(state => state.setVolume)
  const previousVolumenRef = useRef(volume)

  const isVolumeSilenced = volume < 0.1

  const handleClickVolumen = () => {
    if (isVolumeSilenced) {
      setVolume(previousVolumenRef.current)
    } else {
      previousVolumenRef.current = volume
      setVolume(0)
    }
  }

  return (
    <div className='flex justify-center gap-x-2 fill-white'>
      <button className='opacity-70 transition hover:opacity-100' onClick={handleClickVolumen}>
        {isVolumeSilenced ? <VolumenSilence /> : <Volumen />}
      </button>
      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        value={[volume * 100]}
        className='w-24'
        onValueChange={(value) => {
          const [newVolume] = value
          const volumeValue = newVolume / 100
          setVolume(volumeValue)
        }}
      />
    </div>
  )
}

export default VolumenControl
