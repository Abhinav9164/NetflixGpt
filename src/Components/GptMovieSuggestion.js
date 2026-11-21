import React, { useEffect, useState } from 'react'
import MovieList from "./MovieList"
import { useSelector } from 'react-redux'

const MESSAGES = [
  "Asking the AI for picks…",
  "Browsing the movie library…",
  "Fetching posters…",
  "Almost there…",
];

const Loader = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className='mx-auto my-6 w-11/12 md:w-2/3 lg:w-1/2 bg-neutral-950 rounded-2xl shadow-2xl border border-neutral-800 py-14 flex flex-col items-center'>
      {/* equalizer-style bars */}
      <div className='flex items-end gap-1.5 h-12'>
        {[0, 1, 2, 3, 4].map((n) => (
          <span
            key={n}
            className='w-2 rounded-full bg-red-600 animate-bounce'
            style={{ height: `${28 + (n % 3) * 10}px`, animationDelay: `${n * 120}ms` }}
          />
        ))}
      </div>
      <p className='mt-6 text-lg font-semibold text-white'>Finding movies for you</p>
      <p className='mt-1 text-sm text-neutral-400 h-5 transition-opacity'>{MESSAGES[i]}</p>
    </div>
  );
};

const GptMovieSuggestion = () => {

  const {movieResults,movieNames,loading} = useSelector((store) => store.GPT);

  if (loading) return <Loader />;

  if(!movieNames)
     return null

  return (
    <div className='p-4 m-4 bg-neutral-950 rounded-2xl border border-neutral-800 shadow-2xl'>
      {movieNames.map((name,index) => (
        <MovieList
          key={name}
          title={name}
          movies={movieResults[index]} />
      ))}
    </div>
  )
}

export default GptMovieSuggestion
