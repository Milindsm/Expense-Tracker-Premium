import './App.css';
import React,{useContext} from 'react';
import { Routes,Route } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import Profile from "./Components/Profile/Profile";
import AuthContext from './Components/Store/AuthContext';
import VerifyEmail from './Components/VerifyEmail/VerifyEmail';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';

function App() {
  const auth_ctx = useContext(AuthContext);
  let loggedIn = auth_ctx.isLoggedIn;

  return (
    <Routes>
            <Route path="/" element={<SignUp />} />
            <Route
                path="/profile"
                element={loggedIn ? <Profile /> : <SignUp />}
            />
            <Route
                path="/verify"
                element={loggedIn ? <VerifyEmail /> : <SignUp />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes> 
  );
}

export default App;
