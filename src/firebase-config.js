import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getFunctions } from "firebase/functions";

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const functions = getFunctions(firebaseApp);
export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();
export const auth = firebase.auth();

const firebaseConfig = {
  apiKey: functions.artportfolio_monika.apiKey,
  authDomain: process.env.artportfolio_monika.auth_domain,
  projectId: process.env.artportfolio_monika.project_id,
  storageBucket: process.env.artportfolio_monika.storage_bucket,
  messagingSenderId: process.env.artportfolio_monika.messaging_sender_id,
  appId: process.env.artportfolio_monika.app_id,
};
