import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC2crdXm5tEjgtIhG5mbV8FMI9xK_MJevo",
  authDomain: "medcare-video-calling.firebaseapp.com",
  projectId: "medcare-video-calling",
  storageBucket: "medcare-video-calling.appspot.com",
  messagingSenderId: "455950935583",
  appId: "1:455950935583:web:befb80768de1113392972a",
  measurementId: "G-XVCH8ESYGK",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);


export const db = getFirestore(app);

export default app;