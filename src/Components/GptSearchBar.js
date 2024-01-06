import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux';
import openai from "../utils/openai"

const GptSearchBar = () => {

  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const handleSearchClick = async() => {

    console.log(searchText.current.value);

    const gptQuery = "Act as a movie recommendation system and suggest some movies for the query"
     + searchText.current.value + "give me name of 5 movies comma seprated as example given ahead. example: Creed,Don,Aquaman,Sholay"

    const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });

      console.log(gptResults.choices)
    }

  

  return (
    <div className='pt-[10%] flex justify-center'>
        <form
        onSubmit={(e) =>e.preventDefault()}
        className='w-1/2 bg-black grid grid-cols-12' >
            <input 
              ref={searchText}
              type='text'
               placeholder={lang[langKey].gptSearchPlaceholder}
              className='p-4 m-4 col-span-9'
            />
            <button
             onClick={handleSearchClick}
            className='col-span-3 m-4 bg-red-700 text-white rounded-sm'>{lang[langKey].search }</button>
        </form>
    </div>
  )
}

export default GptSearchBar