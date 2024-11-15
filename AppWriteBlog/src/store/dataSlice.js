import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState  = {
    data : null,
    loading : false,
    error : null,
}

const dataSlice = createSlice({
    name : 'data',
    initialState : initialState,
    reducers : {
        fetchDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchDataError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

// Export actions
export const { fetchDataStart, fetchDataSuccess, fetchDataError } = dataSlice.actions

// Thunk action to fetch data
export const fetchData = () => async (dispatch) => { 
    dispatch(fetchDataStart());
    try { 
        const response = await fetch('https://api.github.com/users/thakurvs');
        if(!response.ok){
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        dispatch(fetchDataSuccess(data));
    }
    catch(error){
        dispatch(fetchDataError(error.message));
    }
}

export default dataSlice.reducer;