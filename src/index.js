import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZvs1nCT1jxO_3dc3GPh5Zp2XtJy07FaA",
  authDomain: "coderhouse-ecommerce-ec1a4.firebaseapp.com",
  projectId: "coderhouse-ecommerce-ec1a4",
  storageBucket: "coderhouse-ecommerce-ec1a4.appspot.com",
  messagingSenderId: "728698584736",
  appId: "1:728698584736:web:1263ab0fb184481be393c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

