import React from "react";
import classes from "./Toggle.module.css";
import { useDispatch,useSelector } from "react-redux";
import { themeActions } from "../Store/ThemeRedux";

const ToggleTheme = () => {
    const dispatch = useDispatch();
    const isDark = useSelector((state) => state.theme.isDark);

    const themeHandler = () => {
        dispatch(themeActions.setTheme());
    };

    return (
        <button
            className={
                isDark ? classes.actionButton : classes["actionButton_light"]
            }
            onClick={themeHandler}
        >
            Change Theme
        </button>
    );
};

export default ToggleTheme;