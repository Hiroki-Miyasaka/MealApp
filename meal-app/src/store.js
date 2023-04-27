import { configureStore, combineReducers } from "@reduxjs/toolkit";
import mealReducer from "./reducers/mealSlice";
import userReducer from "./reducers/userSlice";


const rootReducer = combineReducers({
    user: userReducer,
    meal: mealReducer
})

const store = configureStore({
    reducer: rootReducer
});

export default store;