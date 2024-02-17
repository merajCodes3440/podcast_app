// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbF1wUphT8tq93laAbC3kTW-kiH3kdylU",
  authDomain: "podcast-e72d1.firebaseapp.com",
  projectId: "podcast-e72d1",
  storageBucket: "podcast-e72d1.appspot.com",
  messagingSenderId: "936317375930",
  appId: "1:936317375930:web:0c9e1ec6c433d8263fb983",
  measurementId: "G-YTM0LFE3J7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {auth,db,storage};

