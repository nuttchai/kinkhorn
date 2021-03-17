import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {AppRoot} from './Layouts/Globalstyle';
import UserProvider from './Context/UserContext';
ReactDOM.render(
  <UserProvider>
    <React.StrictMode>
      <BrowserRouter>
        <AppRoot/>
        <App />
    </BrowserRouter>
    </React.StrictMode>
  </UserProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();