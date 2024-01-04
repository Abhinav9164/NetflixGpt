import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVedio } from '../utils/moviesSlice';



const useMovieTrailer = (movieId) => {
     
    const dispactch = useDispatch();

    const getMoviesVedio = async () => {
        
        const data = await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",API_OPTIONS)
        const json = await data.json()


        const filteredData = json.results.filter((vedio) => vedio.type === "Trailer")
        const trailer = filteredData.length ? filteredData[0] : json.results[0];

        dispactch(addTrailerVedio(trailer))
        
    }

    useEffect(()=>{
        getMoviesVedio();
    },[])

}

export default useMovieTrailer;