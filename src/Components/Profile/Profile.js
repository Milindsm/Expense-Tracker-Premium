import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Profile.module.css"

const Profile = () => {
    const navigate = useNavigate();
    const profileUpdateHandler = () => {
        navigate("/updateDetails");
    };
    return (
        <div className={classes.start}>
            <h3>Welcome to Expense Tracker!</h3>
            <p className={classes.statement}>Your profile is incomplete</p>
            <button
                className={classes.updateButton}
                onClick={profileUpdateHandler}
            >
                Complete now
            </button>
        </div>
    );
};

export default Profile;