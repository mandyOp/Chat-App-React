// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDCLqn7i6Z2moZUbh2pFdaODf_AvRrLbPk",
    authDomain: "chat-clone-33033.firebaseapp.com",
    projectId: "chat-clone-33033",
    storageBucket: "chat-clone-33033.appspot.com",
    messagingSenderId: "150096016397",
    appId: "1:150096016397:web:d0dfa4c24514af90591144",
    measurementId: "G-2NZ4H58YEW"
  };

  //this line of code connects everything
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  //this is for database connection
  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};

  export {db};
  