import React, { useState, useCallback } from 'react'
import { IMG_CDN_URL } from '../utils/constants'
import TrailerModal from './TrailerModal'

const MovieCard = ({ movie }) => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  if(!movie?.poster_path)
  return null

  return (
    <div className='w-36 pr-4 shrink-0 relative hover:z-30'>
      <img
        alt={movie.title || movie.name || "Movie Card"}
        src={IMG_CDN_URL + movie.poster_path}
        onClick={() => setOpen(true)}
        className='rounded-md cursor-pointer transition-all duration-300 ease-out hover:scale-125 hover:shadow-2xl hover:shadow-black hover:ring-2 hover:ring-white/70'
      />
      {open && <TrailerModal movie={movie} onClose={close} />}
    </div>
  )
}

export default MovieCard
