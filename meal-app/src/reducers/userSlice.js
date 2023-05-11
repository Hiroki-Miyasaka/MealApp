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
        },
        setLoggedIn(state, action){
            state.isLoggedIn = action.payload;
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
            // state.token = null;
            // state.expiresIn = null;
        }
    }
});

export const { setUser, setLoggedIn, setLoading, setError, resetState } = userSlice.actions;

// export const login = (userData) => async dispatch => {
//     try{
//         dispatch(setLoading(true));
//         const response = await axios.post(import.meta.env.VITE_APP_URL + "/api/auth/login", userData);
//         axios.defaults.headers.common["Authorization"] = response.data.token;
//         dispatch(setUser(response.data));
//         console.log(response.data);
//         // localStorage.setItem("favMeals", JSON.stringify())
//     } catch(error){
//         dispatch(setError(error.response.data.message));
//         // console.log(error.response.data.message);
//     } finally{
//         dispatch(setLoading(false));
//     }
// };

// export const register = (userData) => async dispatch => {
//     try{
//         dispatch(setLoading(true));
//         const response = await axios.post(import.meta.env.VITE_APP_URL + "/api/auth/register", userData);
//         // console.log("userSlice Success register");
//         return response.data;
//     } catch(error){
//         dispatch(setError(error.responce.data.message));
//         // console.log("userSlice", error);
//         return error;
//     } finally{
//         dispatch(setLoading(false));
//     }
// };

export const logout = () => async dispatch => {
    try {
        dispatch(resetState());
        delete axios.defaults.headers.common["Authorization"];
    } catch(error){
        console.log(error);
    }
};

export const getMe = () => async dispatch => {
    try{
        dispatch(setLoading(true));
        const responce = await axios.get(import.meta.env.VITE_APP_URL + "/me");
        dispatch(setUser(responce.data.user));
    } catch(error){
        dispatch(setError(error.responce.data.message));
        console.log(error.responce.data.message);
    } finally{
        dispatch(setLoading(false));
    }
};

export default userSlice.reducer;