import React from 'react'
import VedioBackground from './VedioBackground';
import VedioTitle from './VedioTitle'; 
import { useSelector } from 'react-redux';

const Mainconatiner = () => {

   const movies = useSelector((store) => store.movies?.nowPlayingMovies);

   if(!movies) return;
   console.log(movies)

   // let rndm = Math.floor(Math.random() * 20) + 1

   const mainMovie = movies[1];

   const {overview,original_title,id} = mainMovie;

  return (
   <div>

      <VedioTitle title={original_title} overview={overview} /> 
      <VedioBackground movieId={id} />
      
   </div>
    )
}

export default Mainconatiner