// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDkYuuLIkFfF6hcYaFc4OxeWyZYG2KO3fM",
  authDomain: "river-range-resort.firebaseapp.com",
  databaseURL:
    "https://river-range-resort-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "river-range-resort",
  storageBucket: "river-range-resort.firebasedestorage.app",
  messagingSenderId: "396126163712",
  appId: "1:396126163712:web:dca2e9bf9f35ae9beed9e5",
  measurementId: "G-3SBJM8RZ63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);
