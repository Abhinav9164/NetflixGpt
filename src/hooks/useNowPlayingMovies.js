import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from 'react-redux'
import {addNowPlayingMovies} from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
    

    const dispacth = useDispatch();
    const getNowPlayingMovies = async () => {
        const data  = await fetch("https://api.themoviedb.org/3/movie/now_playing?page1",API_OPTIONS)
        const json = await data.json();
        
        console.log(json.results)
        dispacth(addNowPlayingMovies(json.results));
    }

    useEffect(() => {
    getNowPlayingMovies();
    },[])

}

export default useNowPlayingMovies