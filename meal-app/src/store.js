import { configureStore, combineReducers } from "@reduxjs/toolkit";
import mealReducer from "./reducers/mealSlice";
import userReducer from "./reducers/userSlice";
import favoriteReducer from "./reducers/favoriteSlice";


const rootReducer = combineReducers({
    user: userReducer,
    meal: mealReducer,
    favorite: favoriteReducer
})

const store = configureStore({
    reducer: rootReducer
});

export default store;