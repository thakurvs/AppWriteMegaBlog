import { configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { combineReducers } from 'redux';
import authReducer from "./authSlice";
import searchReducer from "./searchSlice";
import dataReducer from "./dataSlice"
import {thunk}  from "redux-thunk";


// Combine all reducers
const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    data: dataReducer
});

// Persist configuration
const persistConfig = {
    key: "root", // Root key for storage
    storage,     // Use localStorage
    serialize: false, // Prevent auto stringification of state
    deserialize: false, // Prevent auto parsing of state
    whitelist: ["auth"], // Only persist the auth slice
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with Thunk and Persist
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore specific warnings from redux-persist
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(thunk),
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };

// const store = configureStore({
//     reducer : {
//         auth: authSlice,
//         search: searchSlice,    // Add search slice
//         data : dataReducer
//         //TODO: add more slices here for posts
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// })

// export default store;