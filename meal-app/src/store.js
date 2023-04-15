import { configureStore } from "@reduxjs/toolkit";
import mealReducer from "./reducers/mealSlice";

const store = configureStore({
    reducer: {
        meal: mealReducer
    }
});

export default store;