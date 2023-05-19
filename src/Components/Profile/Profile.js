import React,{useState,useContext,useCallback,useEffect} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
import UpdateForm from "../Update/UpdateForm";
import classes from "./Profile.module.css"
import VerifyEmail from "../VerifyEmail/VerifyEmail";

let collectedData = {
    email: "",
    displayName: "",
    photoUrl: "",
};

const Profile = () => {
    const authCtx = useContext(AuthContext);
    const idToken = localStorage.getItem("token");
    const [isComplete, setIsComplete] = useState(false);
    const [isVerified, setIsVerified] = useState(true);
    const [updateStatus, setUpdateStatus] = useState();
    const profileUpdateHandler = () => {
        setIsComplete(true);
    };
    const onCancelHandler = () => {
        setIsComplete(false);
    };
    const logoutHandler = () => {
        authCtx.logout();
    };
    const profileHandler = useCallback(() => {
        if (authCtx.isLoggedIn) {
            fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCzpS8mhUYjlEGXWgom8MK0UNFqjGjlbzM",
                {
                    method: "POST",
                    body: JSON.stringify({
                        idToken: idToken,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
                )
                .then(async (res) => {
                    if (res.ok) {
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
                    console.log(data.users[0].emailVerified);
                    if (!data.users[0].emailVerified) {
                        setIsVerified(false);
                    } else {
                        setIsVerified(true);
                    }
                    collectedData.email = data.users[0].email;
                    if (data.users[0].displayName && data.users[0].photoUrl) {
                        collectedData.displayName = data.users[0].displayName;
                        collectedData.photoUrl = data.users[0].photoUrl;
                        setUpdateStatus(true);
                    } else {
                        setUpdateStatus(false);
                    }
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    }, [authCtx.isLoggedIn, idToken]);

    useEffect(() => {
        profileHandler();
    }, [profileHandler]);
    return (
        <React.Fragment>
            <div className={classes.start}>
                <h3>Welcome to Expense Tracker!</h3>
                {!updateStatus && isVerified && (
                    <p className={classes.statement}>
                        Your profile is incomplete
                        <button
                            className={classes.actionToggle}
                            onClick={profileUpdateHandler}
                        >
                            Complete now
                        </button>
                        <button
                            className={classes.actionButton}
                            onClick={logoutHandler}
                        >
                            Logout
                        </button>
                    </p>
                )}
                {updateStatus && isVerified && (
                    <p className={classes.statement}>
                        Your profile is Complete
                        <button
                            className={classes.actionToggle}
                            onClick={profileUpdateHandler}
                        >
                            Edit now
                        </button>
                        <button
                            className={classes.actionButton}
                            onClick={logoutHandler}
                        >
                            Logout
                        </button>
                    </p>
                )}
            </div>
            {isComplete && isVerified && (
                <UpdateForm data={collectedData} onCancel={onCancelHandler} />
            )}
            {!isVerified && <VerifyEmail />}
            <Link to="/ExpenseTracker" style={{ textDecoration: "none" }}>
                <div className={classes.start}>
                    <button className={classes.actionButton2}>
                        Expense Tracker
                    </button>
                </div>
            </Link>
        </React.Fragment>
    );
};

export default Profile;