import './App.css';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import Profile from "./Components/Profile/Profile";
import UpdateForm from './Components/Update/UpdateForm';

function App() {
  return (
    <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/updateDetails' element={<UpdateForm/>}/>
    </Routes> 
  );
}

export default App;
