import nc from 'next-connect';
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';
import Cors from 'cors';
import { createJob } from '../../lib/firestore';
import { firebaseAdmin, firestore } from '../../lib/firebase-admin';
import { NanoId } from '../../lib/firebase-helpers';
import { firebaseAuth, firebaseUserRole } from '../../middleware/auth';

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
    }
  })
  .use(async (req, res, next) => {
    const { uid } = req.currentUser;

    if (req.headers?.['hapsa-role']?.startsWith('recruiter-')) {
      const recruiterRequest = req.headers['hapsa-role'].split('-');

      if (
        recruiterRequest[0] === 'recruiter' &&
        recruiterRequest[1] === '007'
      ) {
        try {
          await firebaseAdmin.auth().setCustomUserClaims(uid, {
            recruiter: true,
          });
          next();
        } catch (error) {
          res.status(500).json({
            error: 'Something went wrong with setting custom claims',
          });
        }
      }
    }
    res.status(400).json({
      error: 'Not authorized',
    });
  })
  .post(async (req, res) => {
    // const { body } = req;
    // if (!body) {
    //   res.status(404).end('request body is not found... or is it');
    // }

    // const randomId = await NanoId();

    // const title = req.body.title.toLowerCase().split(' ').join('-');
    // const jobId = title.concat(randomId);

    // const job = await createJob(jobId, body);

    res.status(200).json({
      msg: 'Success',
    });
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!');
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default handler;
