import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthRedux";
import themeReducer from "./ThemeRedux"
import expReducer from "./ExpenseRedux";
const store = configureStore({
    // reducer: { auth: authReducer, exp: expReducer },
    reducer: { auth: authReducer, exp: expReducer, theme: themeReducer },
});

export default store;