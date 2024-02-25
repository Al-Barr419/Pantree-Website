import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBu9Fpjo6L0cSK1kKT1ar8F1FrdxPTrjnA",
  authDomain: "pantree-aafff.firebaseapp.com",
  projectId: "pantree-aafff",
  storageBucket: "pantree-aafff.appspot.com",
  messagingSenderId: "720536267152",
  appId: "1:720536267152:web:7dcdaa4271d4d40612eb15",
  measurementId: "G-XHWG6WL05G",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { auth, app };
