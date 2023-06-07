// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCn73D5cS_xYvGtcxm91gcZLsFeJeYtx_k",
    authDomain: "flearning-131be.firebaseapp.com",
    projectId: "flearning-131be",
    storageBucket: "flearning-131be.appspot.com",
    messagingSenderId: "778726501025",
    appId: "1:778726501025:web:dbe6b7d2c5d0daede69ee0",
    measurementId: "G-VNWT9E04D7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase storage reference
const storage = getStorage(app);

export default storage;
