import * as firebaseAdmin from 'firebase-admin';

const firestore = firebaseAdmin.firestore();

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
    databaseURL: 'https://hapsa-studio.firebaseio.com',
  });
}
export { firebaseAdmin, firestore };
