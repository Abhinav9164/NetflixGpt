import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  console.log(movies);

  const renderMovieCards = () => {
    return movies.map(movie => (
      <MovieCard key={movie.id} posterPath={movie.poster_path} />
    ));
  };

  return (
    <div className='w-screen px-6'>
     <h1 className='text-xl py-4 text-white'>{title}</h1>
      <div  
      className='flex no-scrollbar overflow-x-scroll'>
        <div className='flex p-4'>
        {movies && movies.length > 0 ? (
            renderMovieCards()
          ) : (
            <p>No movies available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
