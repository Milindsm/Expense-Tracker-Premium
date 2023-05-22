import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = { isDark: false };

const themeSlice = createSlice({
    name: "theme",
    initialState: initialThemeState,
    reducers: {
        setTheme(state, action) {
            state.isDark = !state.isDark;
        },
    },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;