import './App.css';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import Profile from "./Components/Profile/Profile";

function App() {
  return (
    <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
    </Routes> 
  );
}

export default App;
