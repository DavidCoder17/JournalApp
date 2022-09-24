// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUAwKiDhH2KdQZGSEUMUxHSswU8mu3uyM",
  authDomain: "react-cursos-e3c79.firebaseapp.com",
  projectId: "react-cursos-e3c79",
  storageBucket: "react-cursos-e3c79.appspot.com",
  messagingSenderId: "731235517102",
  appId: "1:731235517102:web:e992c25bad3583ed50a33f"
};

// Initialize Firebase
//* Nos da los metodos necesarios para usar Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );