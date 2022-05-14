import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: process.env.ARTPORTFOLIO_MONIKA_API_KEY,
  authDomain: process.env.ARTPORTFOLIO_MONIKA_AUTH_DOMAIN,
  projectId: process.env.ARTPORTFOLIO_MONIKA_PROJECT_ID,
  storageBucket: process.env.ARTPORTFOLIO_MONIKA_STORAGE_BUCKET,
  messagingSenderId: process.env.ARTPORTFOLIO_MONIKA_MESSAGING_SENDER_ID,
  appId: process.env.ARTPORTFOLIO_MONIKA_APP_ID,
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();
export const auth = firebase.auth();
