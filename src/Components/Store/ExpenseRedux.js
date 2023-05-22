import { createSlice } from "@reduxjs/toolkit";

const initialExpState = { expenses: [], isPremium: false };

const expSlice = createSlice({
    name: "expense",
    initialState: initialExpState,
    reducers: {
        addExpense(state, action) {
            state.expenses = [...action.payload];
        },
        addPremium(state, action) {
            if (action.payload > 10000) {
                state.isPremium = true;
            }
            if (action.payload <= 10000) {
                state.isPremium = false;
            }
        },
    },
});

export const expActions = expSlice.actions;
export default expSlice.reducer;