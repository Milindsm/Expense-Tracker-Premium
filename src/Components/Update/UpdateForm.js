import React,{useRef} from "react";
import classes from "./UpdateForm.module.css";

const UpdateForm = (props) => {
    const idToken = localStorage.getItem("token");

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
        <div className={classes.wrapper}>
            <h1>Contact Details</h1>
            <form className={classes.form}>
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
                <div className={classes.actions}>
                    <button onClick={updateProfileHandler}>update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateForm;