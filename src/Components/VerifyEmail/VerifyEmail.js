import { useNavigate } from "react-router-dom";
import classes from "./VerifyEmail.module.css";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const idToken = localStorage.getItem("token");
    const verifyEmailHandler = () => {
        fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCzpS8mhUYjlEGXWgom8MK0UNFqjGjlbzM",
            {
                method: "POST",
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
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
                console.log(data);

                navigate("/profile");
            })
            .catch((err) => {
                alert(err.message);
            });
    };
    return (
        <div className={classes.start}>
            <button
                onClick={verifyEmailHandler}
                className={classes.actionButton}
            >
                Verify Email
            </button>
        </div>
    );
};

export default VerifyEmail;