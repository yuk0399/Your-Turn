import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyBFjxU29wO_8R2EE4o-XSD5fffetxHUGAk",
//   authDomain: "your-turn-b96fd.firebaseapp.com",
//   databaseURL: "https://your-turn-b96fd.firebaseio.com",
//   projectId: "your-turn-b96fd",
//   storageBucket: "your-turn-b96fd.appspot.com",
//   messagingSenderId: "59882471523",
//   appId: "1:59882471523:web:ec5573b2712b6d19d9f856",
//   measurementId: "G-24Y45RTJSZ"
// };
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'your-turn-b96fd.firebaseapp.com',
  databaseURL: 'https://your-turn-b96fd.firebaseio.com',
  projectId: 'your-turn-b96fd',
  storageBucket: 'your-turn-b96fd.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export {
  auth
};
