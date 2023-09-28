import { getAnalytics } from 'firebase/analytics';
import { firestore, initializeApp } from 'firebase/app';

import { getStorage } from 'firebase/storage';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVUQRdTJLDcvTeKXKTkyK9SX78P7pHdD8",
  authDomain: "medcare-e9794.firebaseapp.com",
  projectId: "medcare-e9794",
  storageBucket: "medcare-e9794.appspot.com",
  messagingSenderId: "10602563922",
  appId: "1:10602563922:web:32f0bcf94ea442b869928b",
  measurementId: "G-2C82RV78NS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

const firestore = firestore();

export default app;