// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9UE4JSmgGTt_me59PoqsMkXTbhdcy4AQ",
  authDomain: "realtor-clone-reactjs-c517a.firebaseapp.com",
  projectId: "realtor-clone-reactjs-c517a",
  storageBucket: "realtor-clone-reactjs-c517a.appspot.com",
  messagingSenderId: "368022601669",
  appId: "1:368022601669:web:a1fae8df06feab3ea895ac"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();