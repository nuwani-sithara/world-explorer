// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdfct-0AZW1t0aRXQAQy4nCipuvrqOEgM",
  authDomain: "countries-app-46e68.firebaseapp.com",
  projectId: "countries-app-46e68",
  storageBucket: "countries-app-46e68.firebasestorage.app",
  messagingSenderId: "222225317813",
  appId: "1:222225317813:web:5f824f05c540eb109823fc",
  measurementId: "G-29C4HC0NBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the services
export { auth, db };