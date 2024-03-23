// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "nitin-s-blog.firebaseapp.com",
  projectId: "nitin-s-blog",
  storageBucket: "nitin-s-blog.appspot.com",
  messagingSenderId: "22846366881",
  appId: "1:22846366881:web:21063a883f4990a8617ce0",
  measurementId: "G-76GXJ4NHCS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);