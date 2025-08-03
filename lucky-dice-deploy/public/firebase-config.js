// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyArNWH7YWeyYvzNNFC9F2Cl8CiUSr3PVlI",
  authDomain: "indiagamelobby.firebaseapp.com",
  projectId: "indiagamelobby",
  storageBucket: "indiagamelobby.firebasestorage.app",
  messagingSenderId: "89524096016",
  appId: "1:89524096016:web:cbdfdbe9bb03596168ce95",
  measurementId: "G-G3S8CBG9ZG"
};

// Initialize Firebase app for user project
const app = initializeApp(firebaseConfig);

// Export auth and db for user project
export const auth = getAuth(app);
export const db = getFirestore(app);
