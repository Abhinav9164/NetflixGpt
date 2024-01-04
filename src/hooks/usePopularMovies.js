import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from 'react-redux'
import {popularMovies} from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
    

    const dispacth = useDispatch();
    const getNowPlayingMovies = async () => {
        const data  = await fetch("https://api.themoviedb.org/3/movie/popular?page1",API_OPTIONS)
        const json = await data.json();
        
        dispacth(popularMovies(json.results));
    }

    useEffect(() => {
    getNowPlayingMovies();
    },[])

}

export default usePopularMovies;