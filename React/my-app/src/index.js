import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserSlice, { Create_User } from './Store/UserSlice';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'primeflex/primeflex.css';

import 'primeflex/primeflex.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // או ערכת נושא אחרת
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const myStore = configureStore({
  reducer: {
    UserSlice,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<Provider store={myStore}> 
    <App/>
</Provider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
