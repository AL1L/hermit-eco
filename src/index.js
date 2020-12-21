import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/remote-config';

window.firebase = firebase;

const firebaseConfig = {
  apiKey: "AIzaSyA9a7eK__8fW66F_x1dSKduFLcv74sX0Hc",
  authDomain: "hermit-eco.firebaseapp.com",
  projectId: "hermit-eco",
  storageBucket: "hermit-eco.appspot.com",
  messagingSenderId: "236268104142",
  appId: "1:236268104142:web:9f3b770014373eb6b4239f",
  measurementId: "G-GRJP6ZCLYZ"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
