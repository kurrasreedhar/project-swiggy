// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaYdoqYQuQh-hk-BqOgLn3O-nhYf0sxBM",
  authDomain: "project-swiggy.firebaseapp.com",
  projectId: "project-swiggy",
  storageBucket: "project-swiggy.firebasestorage.app",
  messagingSenderId: "539960168074",
  appId: "1:539960168074:web:dbb170b1998e3bbe15a773",
  measurementId: "G-ZWMVBN5XQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();