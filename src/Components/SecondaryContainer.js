import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  const movies = useSelector((store) => store?.movies)

  

  return (
    <div className='bg-black w-screen'>
      <div className='relative -mt-52 z-20 w-screen'>
          <MovieList title = {"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title = {"Top Rated"}   movies={movies.topRatedMovies} />
          <MovieList title = {"Popular"}     movies={movies.popularMovies} />
          <MovieList title = {"Upcoming"}    movies={movies.upcomingMovies} />
          <MovieList title = {"TV Shows"}   movies={movies.tvShows} />
      </div>
    </div>
  )
}

export default SecondaryContainer