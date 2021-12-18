
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { getStorage } from "firebase/storage"
import { initializeFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA72IJeDJ0AEdzrrmhGYv4D59rodXgcg7U",
  authDomain: "wp-clone-1c85c.firebaseapp.com",
  projectId: "wp-clone-1c85c",
  storageBucket: "wp-clone-1c85c.appspot.com",
  messagingSenderId: "847549064332",
  appId: "1:847549064332:web:e614ad44d0f2b4754947a9"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = initializeFirestore(app, { experimentalForceLongPolling: true })

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth,email,password)
}
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth,email,password)
}