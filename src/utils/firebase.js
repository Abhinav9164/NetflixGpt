// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjzANmkcVwj8ru89qQYB-6CmWcsYUt3m8",
  authDomain: "netflix-gpt-3ddc9.firebaseapp.com",
  projectId: "netflix-gpt-3ddc9",
  storageBucket: "netflix-gpt-3ddc9.appspot.com",
  messagingSenderId: "885759186739",
  appId: "1:885759186739:web:5f8ef98775d0ac9b5d9046",
  measurementId: "G-XSV4LN0Q07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const analytics = getAnalytics(app);