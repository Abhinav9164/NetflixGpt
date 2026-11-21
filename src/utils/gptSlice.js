import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:"GPT",
    initialState:{
        showGptSearch:false,
        movieResults:null,
        movieNames:null,
        loading:false
    },
    reducers:{
        toggleGptSearchView: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        setGptLoading:(state,action) => {
            state.loading = action.payload;
        },
        addGptMoviesResults:(state,action) => {
            const {movieNames,movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        }
    }
})

export const {toggleGptSearchView,addGptMoviesResults,setGptLoading} = gptSlice.actions;
export default gptSlice.reducer;