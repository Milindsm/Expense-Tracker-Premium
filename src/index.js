import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import {AuthContextProvider} from './Components/Store/AuthContext';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
// import { ExpenseContextProvider } from './Components/Store/ExpenseContext';
import store from './Components/Store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//   <AuthContextProvider>
//         <ExpenseContextProvider>
//             <BrowserRouter>
//                 <App />
//             </BrowserRouter>
//         </ExpenseContextProvider>
//     </AuthContextProvider>
<Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


