import React,{useRef} from "react";
import classes from "./UpdateForm.module.css";
import { useSelector } from "react-redux";

const UpdateForm = (props) => {
    const idToken = localStorage.getItem("token");
    const isDark = useSelector((state) => state.theme.isDark);

    const fullNameInputRef = useRef();
    const photoUrlInputRef = useRef();

    console.log(props);

    const updateProfileHandler = (event) => {
        event.preventDefault();
        const enteredFullName = fullNameInputRef.current.value;
        const enteredPhotoUrl = photoUrlInputRef.current.value;

        fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCzpS8mhUYjlEGXWgom8MK0UNFqjGjlbzM",

            {
                method: "POST",
                body: JSON.stringify({
                    idToken: idToken,
                    displayName: enteredFullName,
                    photoUrl: enteredPhotoUrl,
                    returnSecureToken: true,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                    alert("Your profile has been updated successfully!");
                    return data;
                }
                await res.json();
                let errorMessage = "Authentication failed!";
                throw new Error(errorMessage);
            })
            .catch((err) => console.log(err));
    };

    return (
        // <div className={classes.wrapper}>
        <div className={isDark ? classes.wrapper : classes["wrapper_light"]}>
            <h1>Contact Details</h1>
            {/* <form className={classes.form}> */}
            <form className={isDark ? classes.form : classes["form_light"]}>
                <label htmlFor="fullName">Full Name </label>
                <input
                    type="text"
                    id="fullName"
                    ref={fullNameInputRef}
                    defaultValue={props.data.displayName}
                    required
                />
                <br />
                <br />
                <label htmlFor="photoUrl">Photo URL</label>
                <input
                    type="text"
                    id="photoUrl"
                    ref={photoUrlInputRef}
                    defaultValue={props.data.photoUrl}
                />
                {/* <div className={classes.actions}> */}
                <div
                    className={
                        isDark ? classes.actions : classes["actions_light"]
                    }
                >
                <button onClick={updateProfileHandler}>Update</button>
                    <button onClick={props.onCancel}>Close</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateForm;