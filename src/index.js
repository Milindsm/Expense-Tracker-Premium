import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {AuthContextProvider} from './Components/Store/AuthContext';
import './index.css';
import App from './App';
import { ExpenseContextProvider } from './Components/Store/ExpenseContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
        <ExpenseContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ExpenseContextProvider>
    </AuthContextProvider>
);


