// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAnN9Wz4VPa2VC3DTwCkNR-nz7zMp-dZbU",
  authDomain: "jlearning-90346.firebaseapp.com",
  projectId: "jlearning-90346",
  storageBucket: "jlearning-90346.appspot.com",
  messagingSenderId: "150756426135",
  appId: "1:150756426135:web:ebdad0409171e2bd1684d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase storage reference
const storage = getStorage(app);

export default storage;
