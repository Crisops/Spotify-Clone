const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className='relative flex items-center gap-4 overflow-hidden'>
      <picture className='w-12 h-auto bg-zinc-800 rounded-md shadow-lg overflow-hidden aspect-square'>
        <img className='w-full h-full object-cover' src={image} alt={title} />
      </picture>
      <div>
        <h3 className='font-bold block text-sm'>{title}</h3>
        <span className='text-xs opacity-50'>{artists?.join(', ')}</span>
      </div>
    </div>
  )
}

export default CurrentSong
