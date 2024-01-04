import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  const movies = useSelector((store) => store?.movies)

  // console.log(movies)

  return (
    <div className='bg-black w-screen'>
      <div className='relative -mt-52 z-20 w-screen'>
          <MovieList title = {"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title = {"Trending"} movies={movies.nowPlayingMovies} />
          <MovieList title = {"Horror"} movies={movies.nowPlayingMovies} />
          <MovieList title = {"Bollywood"} movies={movies.nowPlayingMovies} />
          <MovieList title = {"Hollywood"} movies={movies.nowPlayingMovies} />
      </div>
    </div>
  )
}

export default SecondaryContainer