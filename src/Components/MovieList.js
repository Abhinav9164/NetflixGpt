import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  const isLoading = movies === null;

  // console.log(movies);

  const renderMovieCards = () => {
    return movies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ));
  };

  return (
    <div className='px-6'>
     <h1 className='text-lg md:text-3xl py-4 text-white'>{title}</h1>
      <div  
      className='flex no-scrollbar overflow-x-scroll py-8 pl-4'>
        <div className='flex'>
        {isLoading ? (
          [...Array(8)].map((_, i) => (
            <div key={i} className='w-36 pr-4 shrink-0'>
              <div className='shimmer h-52 rounded-md' />
            </div>
          ))
        ) : movies && movies.length > 0 ? (
            renderMovieCards()
          ) : (
            <p className='text-gray-400'>No movies available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
