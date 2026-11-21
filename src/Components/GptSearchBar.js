import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux';
import { askGemini } from "../utils/gemini"
import { API_OPTIONS } from '../utils/constants';
import { addGptMoviesResults, setGptLoading } from '../utils/gptSlice';

const GptSearchBar = () => {

  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.GPT.loading);
  const searchMoviesTMDB = async (movie) => {

    const url = 'https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=true&language=en-US&page=1';


     const data = await fetch(url, API_OPTIONS);
     const json = await data.json();

     return json.results;

  }

  const handleSearchClick = async() => {

    if (loading || !searchText.current.value.trim()) return;

    console.log(searchText.current.value);

    const gptQuery ="Act as a Movie Recommendation system and suggest some movies for the query : " +
    searchText.current.value +
    ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    dispatch(setGptLoading(true));
    let gptMoviesArray;
    try {
      const text = await askGemini(gptQuery);
      gptMoviesArray = text.split(",").map((m) => m.trim()).filter(Boolean);
    } catch (err) {
      console.error(err);
      alert("Search failed: " + err.message);
      dispatch(setGptLoading(false));
      return;
    }

     console.log(gptMoviesArray)

     //const gptMovies = gptMoviesArray.split("\n");

     //console.log(gptMovies)

     const movieData =  gptMoviesArray.map((movie) => searchMoviesTMDB(movie));

    // console.log(movieData);

    let tmdbResults;
    try {
      tmdbResults = await Promise.all(movieData);
    } catch (err) {
      console.error(err);
      dispatch(setGptLoading(false));
      return;
    }

    console.log(tmdbResults);

    dispatch(addGptMoviesResults({movieResults: tmdbResults, movieNames: gptMoviesArray}));
    dispatch(setGptLoading(false));

  };


  return (
    <div className='pt-[25%] md:pt-0 flex justify-center px-4'>
      <form
        onSubmit={(e) => { e.preventDefault(); handleSearchClick(); }}
        className='w-full md:w-2/3 lg:w-1/2 bg-neutral-950 rounded-xl shadow-2xl border border-neutral-800 p-3 flex gap-3'>
        <input
          ref={searchText}
          type='text'
          disabled={loading}
          placeholder={lang[langKey].gptSearchPlaceholder}
          className='flex-1 min-w-0 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-60'
        />
        <button
          type='submit'
          disabled={loading}
          className='w-32 shrink-0 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors'>
          {loading ? (
            <>
              <span className='h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin' />
              <span>Searching</span>
            </>
          ) : (
            lang[langKey].search
          )}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar
