import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    categories: [],
    isLoading: false,
    error: null,
};

const mealSlice = createSlice({
    name: "meal",
    initialState,
    reducers: {
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

export const { setCategories, setLoading, setError } = mealSlice.actions;

export const fetchCategories = () => async (dispach) => {
    try{
        dispach(setLoading(true));
        const response = await axios.get(
            import.meta.env.VITE_APP_MEAL_URL + "/categories.php"
        );
        console.log(response);
        dispach(setCategories(response.data));
    } catch(error){
        // console.log(error.message);
        dispach(setError(error.message));
    } finally{
        dispach(setLoading(false));
    }
};

export default mealSlice.reducer;