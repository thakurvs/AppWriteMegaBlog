import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm : '',   // This will store the search term
};

const searchSlice = createSlice({
    name: 'search',
    initialState, 
    reducers: {
        setSearchterm : (state, action) => {
            state.searchTerm = action.payload.searchTerm;  // Set the search term
        },
        clearSearchTerm : (state) => {
            state.searchTerm = ''      // Clear search term when needed
        },
    }
})

export const { setSearchterm, clearSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;