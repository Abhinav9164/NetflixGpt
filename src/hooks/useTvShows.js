import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { tvShows } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTvShows = () => {

  const dispatch = useDispatch();

   const getTvShows = async() => {
     
      const data = await fetch("https://api.themoviedb.org/3/discover/tv?page=1",API_OPTIONS);
      const json = await data.json();

      dispatch(tvShows(json.results));
     

   }

   useEffect(()=>{
    getTvShows();
   },[])

}

export default useTvShows;