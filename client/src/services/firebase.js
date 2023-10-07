import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4doWwzR_mei3CNK5jP9dQHFaYXpOlhqM",
  authDomain: "justfit-98fa2.firebaseapp.com",
  projectId: "justfit-98fa2",
  storageBucket: "justfit-98fa2.appspot.com",
  messagingSenderId: "327630099788",
  appId: "1:327630099788:web:af2d7a408e4115f4c9abe9",
  measurementId: "G-FD2EX54LKQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
