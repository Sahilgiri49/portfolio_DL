import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWLVeztLWpV25VAdliaof8baDZZoadffo",
  authDomain: "portfolio-682b6.firebaseapp.com",
  projectId: "portfolio-682b6",
  storageBucket: "portfolio-682b6.firebasestorage.app",
  messagingSenderId: "647683516389",
  appId: "1:647683516389:web:c2e07f5032b6da71fff10c",
  measurementId: "G-DZBPBCVBVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
