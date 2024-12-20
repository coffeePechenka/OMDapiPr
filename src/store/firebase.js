import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDG4np-f0uV3aypAFUvhQcMUHLIn3UT7BA",
  authDomain: "admin-user-3ac47.firebaseapp.com",
  projectId: "admin-user-3ac47",
  storageBucket: "admin-user-3ac47.appspot.com",
  messagingSenderId: "742303979111",
  appId: "1:742303979111:web:7113d38e8ba49ee9ac26c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()