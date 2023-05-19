import React,{useRef,useState} from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ForgotPassword.module.css";

const ForgotPassword = () => {
    const emailInputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const loaderHandler = () => {
        setIsLoading(true);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        setIsLoading(true);
        fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCzpS8mhUYjlEGXWgom8MK0UNFqjGjlbzM",
            {
                method: "POST",
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: enteredEmail,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then(async (res) => {
                if (res.ok) {
                    setIsLoading(false);
                    return res.json();
                } else {
                    const data = await res.json();
                    let errorMessage = "Authentication Failed";

                    if (data && data.error && data.message)
                        errorMessage = data.error.message;
                    throw new Error(errorMessage);
                }
            })
            .then((data) => {
                console.log(data);
                alert("Reset Password mail is sent to your email!");
                navigate("/");
            })
            .catch((err) => {
                alert(err.message);
            });
    };
    return (
        <div className={classes.start}>
            <h1>RESET PASSWORD</h1>
            <form onSubmit={submitHandler}>
                <label>Email Address</label>
                <input type="text" ref={emailInputRef} />
                <button
                    type="submit"
                    className={classes.actionButton}
                    onClick={loaderHandler}
                >
                    {!isLoading ? "Send mail" : "Sending Request"}
                </button>{" "}
            </form>
        </div>
    );
};

export default ForgotPassword;