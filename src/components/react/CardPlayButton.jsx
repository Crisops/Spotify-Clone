import { Pause, Play } from './Icons'
import { usePlayerStore } from '../store/playerStore'

const CardPlayButton = ({ id }) => {
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = usePlayerStore(state => state)

  const isPlayingPlayList = isPlaying && currentMusic.playlist.id === id

  const handleClick = () => {
    if (isPlayingPlayList) {
      setIsPlaying(false)
      return
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data
        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs[0] })
      })
  }

  return (

    <button onClick={handleClick} className='card-play-buttom transition duration-300 rounded-full bg-green-500 p-4 hover:bg-green-600 hover:scale-105'>
      {isPlayingPlayList ? <Pause /> : <Play />}
    </button>

  )
}

export default CardPlayButton
