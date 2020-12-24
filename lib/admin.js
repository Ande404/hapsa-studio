import * as firebaseAdmin from 'firebase-admin';

if (!firebaseAdmin.apps.length) {
  if (process.env.NODE_ENV !== 'production') {
    import serviceAccount from '../1ual1-ee3854bc08.json';
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        privateKey: serviceAccount.private_key,
        clientEmail: serviceAccount.client_email,
        projectId: serviceAccount.project_id,
      }),
      databaseURL: 'https://hapsa-studio.firebaseio.com',
    });
  } else {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      }),
      databaseURL: 'https://hapsa-studio.firebaseio.com',
    });
  }
}

export { firebaseAdmin };
