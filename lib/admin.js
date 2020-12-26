import admin from 'firebase-admin';
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
    databaseURL: 'https://hapsa-studio.firebaseio.com',
  });
}
export default admin.firestore();
