// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyCH4ejbUsh6huJyMijg85EZnaTPZu_yi8I",
  authDomain: "shop-66cbe.firebaseapp.com",
  projectId: "shop-66cbe",
  storageBucket: "shop-66cbe.appspot.com",
  messagingSenderId: "1096025557837",
  appId: "1:1096025557837:web:e40b289e51838beeb60504",
  measurementId: "G-V81KL6Q0H1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };