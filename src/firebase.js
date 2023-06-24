import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAtOmJvQNHjmtO9vbBUa8Hs8XLxaL4ld2I",
  authDomain: "flight-booking-baf09.firebaseapp.com",
  projectId: "flight-booking-baf09",
  storageBucket: "flight-booking-baf09.appspot.com",
  messagingSenderId: "498114574480",
  appId: "1:498114574480:web:88f295ab1e478a223a4015"
  };
  
  firebase.initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = getAuth(app);
  export { db, auth };
  export default firebase;