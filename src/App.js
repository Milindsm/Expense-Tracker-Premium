import './App.css';
import React from 'react';
//import React,{useContext} from 'react';
import { Routes,Route } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import Profile from "./Components/Profile/Profile";
//import AuthContext from './Components/Store/AuthContext';
import { useSelector,useDispatch } from 'react-redux';
import VerifyEmail from './Components/VerifyEmail/VerifyEmail';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ExpenseForm from './Components/ExpenseTracker/ExpenseForm';
import {authActions} from "./Components/Store/AuthRedux"

function App() {
  // const auth_ctx = useContext(AuthContext);
  // let loggedIn = auth_ctx.isLoggedIn;
  const dispatch = useDispatch();
  dispatch(authActions.setIsAuth());

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
            <Route path="/" element={<SignUp />} />
            <Route
                path="/profile"
                // element={loggedIn ? <Profile /> : <SignUp />}
                element={isAuth ? <Profile /> : <SignUp />}
            />
            <Route
                path="/verify"
                // element={loggedIn ? <VerifyEmail /> : <SignUp />}
                element={isAuth ? <VerifyEmail /> : <SignUp />}

            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
                path="/ExpenseTracker"
                // element={loggedIn ? <ExpenseForm /> : <SignUp />}
                element={isAuth ? <ExpenseForm /> : <SignUp />}
            />
    </Routes> 
  );
}

export default App;
