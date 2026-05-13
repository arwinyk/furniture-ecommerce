import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCutun6vzWHdkE5p74FoosDutd3rHc2y-Y",
  authDomain: "furnitue-ecommerse.firebaseapp.com",
  projectId: "furnitue-ecommerse",
  storageBucket: "furnitue-ecommerse.firebasestorage.app",
  messagingSenderId: "600318355241",
  appId: "1:600318355241:web:f509bf0f44223d68003938"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
