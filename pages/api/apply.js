import nc from 'next-connect';
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';
import Cors from 'cors';
import { firebaseAdmin, firestore } from '../../firebase/admin';
import { NanoId } from '../../firebase/helpers';
import { schemaValidator } from '../../schema/validator';
import { applicationSchema } from '../../schema/application';

const cors = Cors({
  methods: ['GET', 'POST', 'HEAD', 'PUT'],
});

function onError(err, req, res, next) {
  res.status(500).end(err.toString());
}

function onNoMatch(req, res) {
  res.status(404).end('Method not allowed');
}

const handler = nc({ onError, onNoMatch }).use(morgan('tiny'), cors);

handler
  .use(async (req, res, next) => {
    // Verify jwt token
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
    // Verify user is an applican
    const user = await firebaseAdmin.auth().getUser(req.currentUser.uid);

    if (user?.customClaims?.recruiter) {
      res.status(401).json({
        error: 'Unauthorized',
      });
    }
    next();
  })
  .use(async (req, res, next) => {
    // Verify schema is valid
    const jobData = JSON.parse(req.body);

    if (!jobData) {
      res.status(400).json({
        error: 'Bad request',
      });
    }
    try {
      const isSchemaValid = await schemaValidator(applicationSchema, jobData);

      if (!isSchemaValid) {
        req.validatedJob = '';
        res.status(400).json({
          error: 'Invalid Schema',
        });
      }
      req.validatedApplication = jobData;
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Bad request',
      });
    }
  })
  .use(async (req, res, next) => {
    const { uid, jobId } = req.validatedApplication;

    const alreadyApplied = await firestore
      .collection('users')
      .doc(uid)
      .collection('applications')
      .where('jobId', '==', jobId)
      .get();

    if (alreadyApplied.empty) {
      next();
    } else {
      console.log('Already applied');
      res.status(400).end();
    }
  })
  .post(async (req, res) => {
    // Create new application
    const { uid, jobId } = req.validatedApplication;

    const newApplication = await firestore
      .collection('users')
      .doc(uid)
      .collection('applications')
      .add({
        jobId,
      });
    res.status(200).json({
      message: `Application submitted: ${newApplication.id}`,
    });
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!');
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default handler;
