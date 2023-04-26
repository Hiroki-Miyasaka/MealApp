import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action){
            state.user = action.payload;
            state.isLoading = true;
        },
        setLoading(state, action){
            state.isLoading = action.payload;
        },
        setError(state, action){
            state.error = action.payload;
        },
        resetState(state){
            state.user = null;
            state.isLoggedIn = false;
            state.isLoading = false;
            state.error = null;
            state.token = null;
            state.expiresIn = null;
        }
    }
});