import { useRef } from "react";
import classes from "./SignUp.module.css";

const SignUp = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const confirmPassword = confirmPasswordInputRef.current.value;

        if (enteredPassword === confirmPassword) {
            fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzpS8mhUYjlEGXWgom8MK0UNFqjGjlbzM",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        returnSecureToken: true,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((res) => alert("You have successfully signed up"))
                .then(() => event.target.reset())
                .catch((err) => alert("something went wrong"));
        } else {
            alert("Both passwords doesn't match");
        }
    };
    return (
        <section className={classes.auth}>
            <h1>SIGN UP</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        required
                        ref={emailInputRef}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        required
                        ref={confirmPasswordInputRef}
                    />
                </div>
                <div className={classes.actions}>
                    <button>SignUp</button>
                </div>
            </form>
        </section>
    );
};

export default SignUp;