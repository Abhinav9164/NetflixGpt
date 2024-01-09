import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import { BG_IMG } from '../utils/constants';

const GptSearch = () => {
  return (
    <div>
      <div className='fixed -z-10'>
        <img  
        className='h-screen w-screen object-cover'
        src={BG_IMG}
          alt="bodyimage"
          />
      </div>
      <div className='pt-[30%] md:pt-[10%]'>
        <GptSearchBar/>
        <GptMovieSuggestion/>
        </div>
    </div>
  )
}

export default GptSearch;