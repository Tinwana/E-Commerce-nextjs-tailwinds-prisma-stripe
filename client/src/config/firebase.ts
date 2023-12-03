import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
export const firebaseConfig = {
  apiKey: "AIzaSyDYvVBq2kSSdGQB5ORku8wVWYsyUawROOc",
  authDomain: "e-commerce-prisma-stripe.firebaseapp.com",
  projectId: "e-commerce-prisma-stripe",
  storageBucket: "e-commerce-prisma-stripe.appspot.com",
  messagingSenderId: "746226428450",
  appId: "1:746226428450:web:5dceaee9574231df7e787b",
  //   measurementId: "G-K225RGC0Z3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }
