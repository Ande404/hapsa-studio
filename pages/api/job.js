import nc from 'next-connect';
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';
import Cors from 'cors';
import { firebaseAdmin, firestore } from '../../lib/firebase-admin';
import { NanoId } from '../../lib/firebase-helpers';
import { schemaValidator } from '../../schema/job';

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
    const userRecord = await firebaseAdmin.auth().getUser(req.currentUser.uid);

    console.log(
      `user custom claims: ${JSON.stringify(userRecord.customClaims)}`
    );
    next();
  })
  .get(async (req, res) => {
    const jobsSnapshot = await firestore
      .collection('jobs')
      .where('status', '==', 'active')
      .get();
    const allJobs = await jobsSnapshot.docs.map((job) => ({
      jobId: job.id,
      jobData: job.data(),
    }));

    res.status(200).json({ jobs: allJobs });
  })
  .use((req, res, next) => {
    if (!req.currentUser.recruiter) {
      res.status(401).json({
        error: 'Not authorized',
      });
    }
    next();
  })
  .use(async (req, res, next) => {
    if (req.body) {
      try {
        const isSchemaValid = await schemaValidator(req.body);
        console.log(isSchemaValid);
        if (isSchemaValid) {
          req.validatedJob = req.body;
          next();
        }
        req.validatedJob = '';
        res.status(400).json({
          error: 'Invalid Schema',
        });
      } catch (error) {
        res.status(400).json({
          error: error.errors,
        });
      }
    }
    res.status(400).json({
      error: 'Bad Input',
    });
  })
  .post(async (req, res) => {
    console.log(`validated job: ${JSON.stringify(req.validatedJob)}`);
    res.status(200);
    // try {
    //   const randomId = await NanoId();
    //   const title = req.body.title.toLowerCase().split(' ').join('-');
    //   const jobId = title.concat(randomId);
    //   const jobData = req.validatedJob;
    //   const newJob = await firestore
    //     .collection('jobs')
    //     .doc(jobId)
    //     .set({ ...jobData, jobId });
    //   res.status(201).json({
    //     message: 'Created new job',
    //     data: newJob,
    //   });
    // } catch (error) {
    //   res.status(500).json({
    //     error: 'Failed to create job',
    //   });
    // }
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!');
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default handler;
