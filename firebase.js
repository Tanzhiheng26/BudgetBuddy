// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*
 const firebaseConfig = {
   apiKey: "AIzaSyD65i18LfTLmDFTDtG7M3563817L1Aw2k8",
   authDomain: "backup-71daa.firebaseapp.com",
   projectId: "backup-71daa",
   storageBucket: "backup-71daa.appspot.com",
   messagingSenderId: "4887175416",
   appId: "1:4887175416:web:a69a2ae7a26bf857135b0d",
   measurementId: "G-QC6QBLYW2Y"
 };
 */


const firebaseConfig = {
  apiKey: "AIzaSyB0zFd7wzjwZZRFOWb5hw6lv3pDMdEkCnI",
  authDomain: "fir-auth-5abf1.firebaseapp.com",
  projectId: "fir-auth-5abf1",
  storageBucket: "fir-auth-5abf1.appspot.com",
  messagingSenderId: "1020326988746",
  appId: "1:1020326988746:web:7acd0d861bedc69dd21d33"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
const db = getFirestore(app);
export { auth, db };