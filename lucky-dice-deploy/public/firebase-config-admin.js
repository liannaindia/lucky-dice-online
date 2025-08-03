// firebase-config-admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const adminConfig = {
  apiKey: "AIzaSyA3e7gop89l8HqLSJo0EHCuTnwCSBk8V3w",
  authDomain: "admin-d5e26.firebaseapp.com",
  projectId: "admin-d5e26",
  storageBucket: "admin-d5e26.firebasestorage.app",
  messagingSenderId: "396788628607",
  appId: "1:396788628607:web:420ed7db8da74d1d03d34a",
  measurementId: "G-CLGRDCWDSM"
};

// Initialize Firebase app for admin project
const adminApp = initializeApp(adminConfig, 'admin'); // Ensure using a unique name for admin app

// Export auth and db for admin project
export const auth = getAuth(adminApp);
export const db = getFirestore(adminApp);
