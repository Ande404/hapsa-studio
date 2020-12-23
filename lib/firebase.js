import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: 'https://hapsa-studio.firebaseio.com',
    storageBucket: 'hapsa-studio.appspot.com',
    messagingSenderId: '323521075600',
    appId: '1:323521075600:web:d25e5966ba4832b7003b15',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

export default firebase;
