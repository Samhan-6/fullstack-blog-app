import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUdXoe4wsSr10-8_NadgCNpO1BbXfUrbo",
  authDomain: "my-react-blog-fa372.firebaseapp.com",
  projectId: "my-react-blog-fa372",
  storageBucket: "my-react-blog-fa372.appspot.com",
  messagingSenderId: "398349793153",
  appId: "1:398349793153:web:76d14b1d938237d3661a80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
