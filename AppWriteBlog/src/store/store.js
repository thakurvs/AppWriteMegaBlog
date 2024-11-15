import { configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import searchSlice from "./searchSlice";
import dataReducer from "./dataSlice"
import {thunk}  from "redux-thunk";

const store = configureStore({
    reducer : {
        auth: authSlice,
        search: searchSlice,    // Add search slice
        data : dataReducer
        //TODO: add more slices here for posts
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store;