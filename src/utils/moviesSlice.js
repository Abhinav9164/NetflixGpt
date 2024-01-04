import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name:"movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVedio: null,
    },
    reducers:{
        addNowPlayingMovies: (state,action) => { 
        state.nowPlayingMovies = action.payload;
        },
        addTrailerVedio: (state,action) => {
            state.trailerVedio = action.payload;
        }
    }
})

export default moviesSlice.reducer;
export const {addNowPlayingMovies,addTrailerVedio} = moviesSlice.actions;
