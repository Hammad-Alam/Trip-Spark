// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdrtLHvoItxrFWObVEKCG9kQ_hYCBTMkU",
  authDomain: "tripspark-52df4.firebaseapp.com",
  projectId: "tripspark-52df4",
  storageBucket: "tripspark-52df4.firebasestorage.app",
  messagingSenderId: "364149666368",
  appId: "1:364149666368:web:65aa186aa9b4a757faa5a5",
  measurementId: "G-255GTSQG56",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
