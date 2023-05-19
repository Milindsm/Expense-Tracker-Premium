import React,{useState} from "react";

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

export default AuthContext;

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem("token");
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token; //to convert truthy or falsy valuues to boolean true or false

    const loginHandler = (token) => {
        setToken(token);

        localStorage.setItem("token", token);
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("token");
    };
    const contextValue = {
        token: token,
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