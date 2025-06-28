import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔧 Replace with your actual Firebase config
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRWDOIADNdoXzUG2dJUlKQqkiU-defAUY",
  authDomain: "seo-meta-saas.firebaseapp.com",
  projectId: "seo-meta-saas",
  storageBucket: "seo-meta-saas.firebasestorage.app",
  messagingSenderId: "168960146548",
  appId: "1:168960146548:web:d3414197dffad4cd1e6521"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Optional: auto-login check
onAuthStateChanged(auth, (user) => {
  const loginBtn = document.getElementById("login-btn");
  if (user) {
    loginBtn.innerText = `Logout (${user.displayName})`;
    loginBtn.onclick = () => signOut(auth);
  } else {
    loginBtn.innerText = "Login with Google";
    loginBtn.onclick = () => signInWithRedirect(auth, provider);
  }
});
