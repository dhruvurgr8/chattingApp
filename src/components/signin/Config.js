import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKVGwhXizTQf62glo53mpRzt3td23T9ek",
  authDomain: "chatapp-c11f8.firebaseapp.com",
  projectId: "chatapp-c11f8",
  storageBucket: "chatapp-c11f8.appspot.com",
  messagingSenderId: "232180044711",
  appId: "1:232180044711:web:1ffb105584751673781c82",
  measurementId: "G-J6VK761XHF",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
