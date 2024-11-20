import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null, // Set to null initially
};

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login : (state, action) => {
            state.status = true;
            state.userData = action.payload;     // Store as an object
            console.log('Setting userData:', action.payload);
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            console.log("After logout, userData:", state.userData);
        }
    },
    extraReducers: (builder) => {
        builder.addCase("persist/REHYDRATE", (state, action) => {
          if (action.payload?.auth?.userData) {
            state.userData = typeof action.payload.auth.userData === "string"
              ? JSON.parse(action.payload.auth.userData) // Parse string
              : action.payload.auth.userData; // Use object directly
          }
          state.status = action.payload?.auth?.status || false;
        });
    },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;