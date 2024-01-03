import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Mainconatiner from './Mainconatiner';
import SecondaryContainer from './SecondaryContainer';


const Browse = () => {

  useNowPlayingMovies();

  return (
    <div>
      <Header/>
      <Mainconatiner />
      <SecondaryContainer />
   {/*
    MainContainer
      -VideoBackground
      -VideoTitle
    SecondaryConatainer
      -Movielist  
      -cards*n
  */}


    </div>
  )
}

export default Browse