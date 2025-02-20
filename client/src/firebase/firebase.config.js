// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0SSZKP3I2j6W9QyMQY6NrnTFH0rc7q3g",
  authDomain: "taskmate-9c56d.firebaseapp.com",
  projectId: "taskmate-9c56d",
  storageBucket: "taskmate-9c56d.firebasestorage.app",
  messagingSenderId: "453712134811",
  appId: "1:453712134811:web:32038a0aa2092547c1fc3e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
