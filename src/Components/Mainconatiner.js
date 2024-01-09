import React from 'react'
import VedioBackground from './VedioBackground';
import VedioTitle from './VedioTitle'; 
import { useSelector } from 'react-redux';

const Mainconatiner = () => {

   const movies = useSelector((store) => store.movies?.nowPlayingMovies);

   if(!movies) return;
  

    let rndm = Math.floor(Math.random() * 20);

   const mainMovie = movies[rndm];

   const {overview,original_title,id} = mainMovie;

  return (
   <div className='md:pt-0 pt-[30%] bg-black'>

      <VedioTitle title={original_title} overview={overview} /> 
      <VedioBackground movieId={id} />
      
   </div>
    )
}

export default Mainconatiner