import { firebaseAdmin } from '../lib/firebase-admin';

export const verifyFirebaseToken = async (req, res, next) => {
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
      req.currentUser = decodedToken;

      next();
    } catch (err) {
      res.status(401).json({
        error: 'Unauthorized',
      });
    }
  }
};
