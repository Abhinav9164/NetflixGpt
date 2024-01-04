import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Mainconatiner from './Mainconatiner';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useTvShows from '../hooks/useTvShows';


const Browse = () => {

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useTvShows();

  return (
    <div>
      <Header/>
      <Mainconatiner />
      <SecondaryContainer />
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