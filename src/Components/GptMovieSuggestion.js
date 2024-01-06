import React from 'react'
import MovieList from "./MovieList"
import { useSelector } from 'react-redux'

const GptMovieSuggestion = () => {
 
  const {movieResults,movieNames} = useSelector((store) => store.GPT);

  if(!movieNames)
     return null


  return (
    <div className='p-4 m-4 bg-black opacity-90'>
      <div>
      {
        movieNames.map((movieNames,index) => (
            <MovieList
            key = {movieNames}
             title={movieNames} 
             movies={movieResults[index]} />
        ))
      }
      </div>
    </div>
  )
}

export default GptMovieSuggestion