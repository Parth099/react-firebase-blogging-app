// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTAWf19XUtFxaylypBNQQiKJMle-IS9fo",
    authDomain: "react-firebase-blogging-app.firebaseapp.com",
    projectId: "react-firebase-blogging-app",
    storageBucket: "react-firebase-blogging-app.appspot.com",
    messagingSenderId: "1046778962501",
    appId: "1:1046778962501:web:ff60eeaad6872c5605b92c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

module.exports = { app, database };
