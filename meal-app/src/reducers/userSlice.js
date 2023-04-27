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

export const { setUser, setLoading, setError, resetState } = userSlice.actions;

export const login = (userData) => async dispatch => {
    try{
        dispatch(setLoading(true));
        const response = await axios.post(import.meta.env.VITE_APP_URL + "/api/auth/login", userData);
        console.log(response);
    } catch(error){
        dispatch(setError(error.response.data.message));
        console.log(error);
    } finally{
        dispatch(setLoading(false));
    }
};

export const register = (userData) => async dispatch => {
    try{
        dispatch(setLoading(true));
        await axios.post(import.meta.env.VITE_APP_URL + "/api/auth/register", userData);
    } catch(error){
        dispatch(setError(error.message));
        console.log(error.message);
    } finally{
        dispatch(setLoading(false));
    }
};

export default userSlice.reducer;