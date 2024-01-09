import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux';
import openai from "../utils/openai"
import { API_OPTIONS } from '../utils/constants';
import { addGptMoviesResults } from '../utils/gptSlice';

const GptSearchBar = () => {

  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const searchMoviesTMDB = async (movie) => {

    const url = 'https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=true&language=en-US&page=1';


     const data = await fetch(url, API_OPTIONS);
     const json = await data.json();

     return json.results;

  }

  const handleSearchClick = async() => {

    console.log(searchText.current.value);

    const gptQuery ="Act as a Movie Recommendation system and suggest some movies for the query : " +
    searchText.current.value +
    ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });

      //console.log(gptResults?.choices[0]?.message?.content)

      if(gptResults.choices){
        //TOTDO:: Error Handling
      }
  
     const gptMoviesArray = gptResults.choices[0]?.message?.content.split(",");

     console.log(gptMoviesArray)

     //const gptMovies = gptMoviesArray.split("\n");

     //console.log(gptMovies)

     const movieData =  gptMoviesArray.map((movie) => searchMoviesTMDB(movie));

    // console.log(movieData);

    const tmdbResults = await Promise.all(movieData);

    console.log(tmdbResults);

    dispatch(addGptMoviesResults({movieResults: tmdbResults, movieNames: gptMoviesArray}));

  };


  return (
    <div className='pt-[25%] md:pt-[00%] flex justify-center'>
        <form
        onSubmit={(e) =>e.preventDefault()}
        className=' w-full md:w-1/2 bg-black grid grid-cols-12' >
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