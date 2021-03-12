import nc from 'next-connect';
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';
import Cors from 'cors';
import { firebaseAdmin, firestore } from '../../firebase/admin';
import { NanoId } from '../../firebase/helpers';

const cors = Cors({
  methods: ['GET', 'POST', 'HEAD', 'PUT'],
});

function onError(err, req, res, next) {
  res.status(500).end(err.toString());
}

function onNoMatch(req, res) {
  res.status(404).end('page is not found... or is it');
}

const handler = nc({ onError, onNoMatch }).use(morgan('tiny'), cors);

handler
  .use(async (req, res, next) => {
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
    } else {
      res.status(401).json({
        error: 'Unauthorized',
      });
    }
  })
  .use(async (req, res, next) => {
    const { uid } = req.currentUser;

    if (req.headers?.['hapsa-role']?.startsWith('recruiter-')) {
      const recruiterRequest = req.headers['hapsa-role'].split('-');

      if (
        recruiterRequest[0] === 'recruiter' &&
        recruiterRequest[1] === process.env.FIREBASE_ROLE_RECRUIT
      ) {
        try {
          await firebaseAdmin.auth().setCustomUserClaims(uid, {
            recruiter: true,
          });
          next();
        } catch (error) {
          res.status(401).json({
            error: 'Unauthorizedss',
          });
        }
      }
    }
    res.status(401).json({
      error: 'Unauthorized',
    });
  })
  .post(async (req, res) => {
    res.status(200).json({
      msg: 'You are a recruiter',
    });
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!');
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default handler;
