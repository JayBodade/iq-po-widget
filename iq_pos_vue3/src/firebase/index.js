import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth";

const {VUE_APP_APIKEY,
  VUE_APP_AUTHDOMAIN,
  VUE_APP_PROJECTID,
  VUE_APP_STORAGEBUCKET,
  VUE_APP_SENDERID,
  VUE_APP_APPID,
  VUE_APP_MEASUREMENTID } = process.env
  console.log("this is process",process.env);

const firebaseConfig = {
  apiKey: VUE_APP_APIKEY,
  authDomain: VUE_APP_AUTHDOMAIN,
  projectId: VUE_APP_PROJECTID,
  storageBucket: VUE_APP_STORAGEBUCKET,
  messagingSenderId: VUE_APP_SENDERID,
  appId: VUE_APP_APPID,
  measurementId: VUE_APP_MEASUREMENTID
  };
  


const app = firebase.initializeApp(firebaseConfig)
export const db = app.firestore();
export const auth = app.auth();
