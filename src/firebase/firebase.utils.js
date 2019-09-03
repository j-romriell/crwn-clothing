import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDXUpnqKLGALcV_WPqQIwL1jDsYuPwVseE",
    authDomain: "crwn-db-c1e27.firebaseapp.com",
    databaseURL: "https://crwn-db-c1e27.firebaseio.com",
    projectId: "crwn-db-c1e27",
    storageBucket: "",
    messagingSenderId: "151043314558",
    appId: "1:151043314558:web:bdaeae8ca5c35258"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get();
      
      if(!snapShot.exists) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          try {
            await userRef.set ({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
          } catch (error) {
            console.log('error creating user', error.message);
          }
      }

      return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;