// import { useRef,useState,useContext } from "react";
import React,{useRef,useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import classes from "./SignUp.module.css";
// import AuthContext from "../Store/AuthContext";
import { authActions } from "../Store/AuthRedux";
import { useDispatch, useSelector} from "react-redux";

const SignUp = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const isDark = useSelector((state) => state.theme.isDark);
    // const auth_ctx = useContext(AuthContext);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };
    const loaderHandler = () => {
        setIsLoading(true);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        

        let url;

        if (!isLogin) {
            const confirmPassword = confirmPasswordInputRef.current.value;

            if (enteredPassword === confirmPassword) {
                url =
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzpS8mhUYjlEGXWgom8MK0UNFqjGjlbzM";
        } else {
            alert("Both passwords doesn't match");
        }
    } else {
        url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzpS8mhUYjlEGXWgom8MK0UNFqjGjlbzM";
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                if (res.ok) {
                    event.target.reset();
                    const data = await res.json();
                    // auth_ctx.login(data.idToken, data.email);
                    dispatch(authActions.login(data.idToken));
                    dispatch(authActions.setUserId(data.email));
                    navigate("/profile");
                    return data;
                } else {
                    await res.json();
                    let errorMessage = "Authentication failed!";
                    setIsLoading(false);
                    event.target.reset();
                    throw new Error(errorMessage);
                }
            })
            .then(() => {
                if (!isLogin) {
                    // alert("You have successfully signed up");
                    console.log("user has successfully signed up");
                } else {
                    // alert("You have successfully logged In");
                    console.log("user has successfully logged in");
                }
            })

            .catch((err) => {
                alert(err.message);
                setIsLoading(false);
            });
    };
    
    return (
        // <section className={classes.auth}>
        <section className={isDark ? classes.auth : classes["auth_light"]}>
            <h1>{isLogin ? "LOGIN" : "SIGN UP"}</h1>
            <p>Please enter the following credentials!</p>
            <form onSubmit={submitHandler}>
                {/* <div className={classes.control}> */}
                <div
                    className={
                        isDark ? classes.control : classes["control_light"]
                    }
                >
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        id="email"
                        required
                        ref={emailInputRef}
                    />
                </div>
                {/* <div className={classes.control}> */}
                <div
                    className={
                        isDark ? classes.control : classes["control_light"]
                    }
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordInputRef}
                    />
                </div>
                {!isLogin && (
                    // <div className={classes.control}>
                    <div
                        className={
                            isDark ? classes.control : classes["control_light"]
                        }
                    >
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            required
                            ref={confirmPasswordInputRef}
                        />
                    </div>
                )}
                <Link to="/forgot-password">
                    {/* <button className={classes.actionToggle}> */}
                    <button
                        className={
                            isDark
                                ? classes.actionToggle
                                : classes["actionToggle_light"]
                        }
                    >
                        Forgot Password?
                    </button>
                </Link>
                <div
                    className={
                        isDark ? classes.actions : classes["actions_light"]
                    }
                >
                {!isLogin && (
                        <div>
                            <button
                                // className={classes.actionButton}
                                className={
                                    isDark
                                        ? classes.actionButton
                                        : classes["actionButton_light"]
                                }
                                onClick={loaderHandler}
                            >
                                {!isLoading ? "SignUp" : "Sending Request..."}
                            </button>
                            <p>
                                Already have an account?{" "}
                                <button
                                    // className={classes.actionToggle}
                                    className={
                                        isDark
                                            ? classes.actionToggle
                                            : classes["actionToggle_light"]
                                    }
                                    onClick={switchAuthModeHandler}
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    )}
                    {isLogin && (
                        <div>
                            <button
                                // className={classes.actionButton}
                                className={
                                    isDark
                                        ? classes.actionButton
                                        : classes["actionButton_light"]
                                }
                                onClick={loaderHandler}
                            >
                                {!isLoading ? "Login" : "Sending Request..."}
                            </button>
                            <p>
                                Don't have an account?{" "}
                                <button
                                    className={
                                        isDark
                                            ? classes.actionToggle
                                            : classes["actionToggle_light"]
                                    }
                                    onClick={switchAuthModeHandler}
                                >
                                    SignUp
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </form>
        </section>
    );
};

export default SignUp;