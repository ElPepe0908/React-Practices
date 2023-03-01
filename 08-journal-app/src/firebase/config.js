// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2hqU80sukFtFHZDXxcH5HYo3eQ_TIS4g",
  authDomain: "react-project-e5a50.firebaseapp.com",
  projectId: "react-project-e5a50",
  storageBucket: "react-project-e5a50.appspot.com",
  messagingSenderId: "531033172080",
  appId: "1:531033172080:web:6a9fb6235721734271acb5",
  measurementId: "G-RJZMZJ12D8",
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp);
export const FireBaseDB = getFirestore(FireBaseApp);
const analytics = getAnalytics(FireBaseApp);
