import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCb9xQKKx-_dkRG70rVAXnzk0iCuNkWloU",
  authDomain: "artportfolio-monika-prod.firebaseapp.com",
  projectId: "artportfolio-monika-prod",
  storageBucket: "artportfolio-monika-prod.appspot.com",
  messagingSenderId: "475563240044",
  appId: "1:475563240044:web:12cb7f29af21d15aa14649",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();
export const auth = firebase.auth();
