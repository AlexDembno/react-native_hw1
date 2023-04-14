import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD8JzjgBJxquUWsYVctMYiuPBcO9DwttWw",
  authDomain: "react-native-b61a9.firebaseapp.com",
  projectId: "react-native-b61a9",
  storageBucket: "react-native-b61a9.appspot.com",
  messagingSenderId: "773179689951",
  appId: "1:773179689951:web:e817d132eadea2797e526a",
  measurementId: "G-1KX2L7DLHN",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
