import './App.css';
import React,{useContext} from 'react';
import { Routes,Route } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import Profile from "./Components/Profile/Profile";
import AuthContext from './Components/Store/AuthContext';

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
    </Routes> 
  );
}

export default App;
