import firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDITRp9k86DVc0VuL6zVF7gcAEoHQFtZY",
    authDomain: "twitter-clone-0096.firebaseapp.com",
    databaseURL: "https://twitter-clone-0096.firebaseio.com",
    projectId: "twitter-clone-0096",
    storageBucket: "twitter-clone-0096.appspot.com",
    messagingSenderId: "327017733981",
    appId: "1:327017733981:web:2ba5b6962904b18a77d2b4",
    measurementId: "G-RB9BR2BSDJ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  export {db, auth, storage }
  export default db;