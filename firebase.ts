// Fix: Changed to namespace imports for Firebase modules to resolve module resolution errors.
import * as firebaseApp from "firebase/app";
import * as firestore from "firebase/firestore";
import * as firebaseAuth from "firebase/auth";

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
const app = firebaseApp.initializeApp(firebaseConfig);
export const db = firestore.getFirestore(app);
export const auth = firebaseAuth.getAuth(app);
export const provider = new firebaseAuth.GoogleAuthProvider();
