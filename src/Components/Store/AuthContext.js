import React,{useState} from "react";

const AuthContext = React.createContext({
    token: "",
    email: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

export default AuthContext;

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem("token");
    const initial_email = localStorage.getItem("email");
    const [token, setToken] = useState(initialToken);
    const [email, setEmail] = useState(initial_email);

    const userIsLoggedIn = !!token; //to convert truthy or falsy valuues to boolean true or false

    const loginHandler = (token,email) => {
        setToken(token);
        setEmail(email);
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);
    };

    const logoutHandler = () => {
        setToken(null);
        setEmail(null);
        localStorage.removeItem("email");
        localStorage.removeItem("token");
    };
    const contextValue = {
        token: token,
        email: email,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};