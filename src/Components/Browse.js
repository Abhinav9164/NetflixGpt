import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Mainconatiner from './Mainconatiner';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useTvShows from '../hooks/useTvShows';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';


const Browse = () => {

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useTvShows();

  const showGptSearch = useSelector((store) => store.GPT.showGptSearch  )

  return (
    <div>
      <Header/>

    {showGptSearch ? (
        <GptSearch />
    ):  
     
    <>
      <Mainconatiner />
      <SecondaryContainer />

    </>
    
    }

      

    </div>
  )
}

export default Browse;

 {/*
    MainContainer
      -VideoBackground
      -VideoTitle
    SecondaryConatainer
      -Movielist  
      -cards*n
  */}