// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsfE8kUMnAgZOB_CQyQFp0wxvRKydsiRI",
  authDomain: "coffee-store-4d78f.firebaseapp.com",
  projectId: "coffee-store-4d78f",
  storageBucket: "coffee-store-4d78f.appspot.com",
  messagingSenderId: "865252838853",
  appId: "1:865252838853:web:e1ec0efbd99707284bcfac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
