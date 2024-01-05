import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import { BG_IMG } from '../utils/constants';

const GptSearch = () => {
  return (
    <div>
      <div className='absolute -z-10'>
        <img  
        className='h-auto'
        src={BG_IMG}
          alt="bodyimage"
          />
      </div>
        <GptSearchBar/>
        <GptMovieSuggestion/>
    </div>
  )
}

export default GptSearch;