import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name:"movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVedio: null,
        popularMovies:null,
        topRatedMovies:null,
        upcomingMovies:null,
        tvShows:null
    },
    reducers:{
        addNowPlayingMovies: (state,action) => { 
        state.nowPlayingMovies = action.payload;
        },
        addTrailerVedio: (state,action) => {
            state.trailerVedio = action.payload;
        },
        popularMovies: (state,action) => {
            state.popularMovies = action.payload;
        },
        topRatedMovies: (state,action) => {
           state.topRatedMovies = action.payload;
        },
        upcomingMovies: (state,action) => {
            state.upcomingMovies = action.payload;
        },
        tvShows: (state,action) => {
            state.tvShows = action.payload;
        }
    }
})

export default moviesSlice.reducer;
export const {
    addNowPlayingMovies,
    addTrailerVedio,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    tvShows 
             } = moviesSlice.actions;
