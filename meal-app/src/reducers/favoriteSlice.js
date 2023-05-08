import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    favorites: [],
    // isLoading: false,
    // error: null
};

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        },
        addFavorites: (state, action) => {
            state.favorites.push(action.payload);
        },
        deleteFavorites: (state, action) => {
            state.favorites = state.favorites.filter((favorite) => favorite.idMeal !== action.payload);
        }
    }
});

export const { setFavorites, addFavorites, deleteFavorites } = favoriteSlice.actions;

export const addNewFavorite = ( newMealData ) => async ( dispatch, getState ) => {
    dispatch(addFavorites(newMealData));
    const newFavorites = getState().favorite.favorites;
    localStorage.setItem("favorite-Meals", JSON.stringify(newFavorites));
    await axios.post(import.meta.env.VITE_APP_URL + "/api/favMeal", newMealData)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log(error);
    });
};

export const removeFavorite = ( idMeal ) => async ( dispatch, getState ) => {
    dispatch(deleteFavorites(idMeal));
    const newFavorites = getState().favorite.favorites;
    localStorage.setItem("favorite-Meals", JSON.stringify(newFavorites));
    await axios.delete(import.meta.env.VITE_APP_URL + "/api/favMeal", { data: { idMeal } })
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log(error);
    });
};

export const loadFavorites = ( arrMealData ) => async dispatch => {
    dispatch(setFavorites(arrMealData));
};

export default favoriteSlice.reducer;