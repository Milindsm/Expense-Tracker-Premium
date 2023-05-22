import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthRedux";
import expReducer from "./ExpenseRedux";
const store = configureStore({
    reducer: { auth: authReducer, exp: expReducer },
});

export default store;