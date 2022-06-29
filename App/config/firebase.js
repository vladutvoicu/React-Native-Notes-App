// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfDDBmyz_OMgBAKd6s41DpHZEWM_g7xd4",
  authDomain: "notesapp-c4e0f.firebaseapp.com",
  projectId: "notesapp-c4e0f",
  storageBucket: "notesapp-c4e0f.appspot.com",
  messagingSenderId: "511387855198",
  appId: "1:511387855198:web:f592b71fe467f8b99fc7cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
