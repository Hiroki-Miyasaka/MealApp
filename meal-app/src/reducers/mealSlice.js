import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    categories: [],
    searchedMeal: [],
    isLoading: false,
    error: null,
};

const mealSlice = createSlice({
    name: "meal",
    initialState,
    reducers: {
        setSearchedMeal: (state, action) => {
            state.searchedMeal = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { setCategories, setLoading, setError, setSearchedMeal } = mealSlice.actions;

export const fetchCategories = () => async (dispach) => {
    try{
        dispach(setLoading(true));
        const response = await axios.get(
            import.meta.env.VITE_APP_CATEGORIES_URL + "/categories.php"
        );
        // console.log(response.data.categories);
        dispach(setCategories(response.data.categories));
    } catch(error){
        // console.log(error.message);
        dispach(setError(error.message));
    } finally{
        dispach(setLoading(false));
    }
};

export const fetchSearchedMeal = (mealName) => async (dispach) => {
    try{
        dispach(setLoading(true));
        const response = await axios.get(
            import.meta.env.VITE_APP_SEARCHED_MEAL_URL + `${mealName}`
        );
        // console.log(response.data.meals);
        dispach(setSearchedMeal(response.data.meals));
    } catch(error){
        console.log(error.message);
        dispach(setError(error.message));
    } finally{
        dispach(setLoading(false));
    }
};

export default mealSlice.reducer;