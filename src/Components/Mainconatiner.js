import React from 'react'
import VedioBackground from './VedioBackground';
import VedioTitle from './VedioTitle'; 
import { useSelector } from 'react-redux';

const Mainconatiner = () => {

   const movies = useSelector((store) => store.movies?.nowPlayingMovies);

   if(!movies) return (
     <div className='md:pt-0 pt-[30%] bg-black'>
       <div className='shimmer w-screen aspect-video relative'>
         <div className='absolute left-6 md:left-12 bottom-[30%] space-y-4 w-2/3 md:w-1/3'>
           <div className='h-10 md:h-14 w-3/4 rounded bg-neutral-700/70' />
           <div className='h-4 w-full rounded bg-neutral-700/70' />
           <div className='h-4 w-5/6 rounded bg-neutral-700/70' />
           <div className='flex gap-3 pt-2'>
             <div className='h-10 w-28 rounded bg-neutral-600/80' />
             <div className='h-10 w-32 rounded bg-neutral-700/70' />
           </div>
         </div>
       </div>
     </div>
   );
  

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