import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAuN4e1aYWumvLGf0pUvu5yyHsIVi9n5U8",
    authDomain: "fir-738ca.firebaseapp.com",
    projectId: "fir-738ca",
    storageBucket: "fir-738ca.firebasestorage.app",
    messagingSenderId: "348799962064",
    appId: "1:348799962064:web:54f91527720d1371bc47d5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);