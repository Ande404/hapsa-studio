import nc from 'next-connect';
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';
import Cors from 'cors';
import superjson from 'superjson';
import { firebaseAdmin, firestore } from '../../lib/firebase-admin';
import { NanoId } from '../../lib/firebase-helpers';
import { schemaValidator } from '../../schema/validator';
import { jobSchema } from '../../schema/job';

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
    const userRecord = await firebaseAdmin.auth().getUser(req.currentUser.uid);

    console.log(
      `user custom claims: ${JSON.stringify(userRecord.customClaims)}`
    );
    next();
  })
  .get(async (req, res) => {
    // Get all active jobs

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
    // Check if user is recruiter

    if (!req.currentUser.recruiter) {
      res.status(401).json({
        error: 'Unauthorized',
      });
    }
    next();
  })
  .use(async (req, res, next) => {
    // Validate user input against schema

    if (!req.body) {
      res.status(400).json({
        error: 'Body not found',
      });
    }
    try {
      const isSchemaValid = await schemaValidator(jobSchema, req.body);

      if (!isSchemaValid) {
        req.validatedJob = '';
        res.status(400).json({
          error: 'Invalid Schema',
        });
      }
      req.validatedJob = req.body;
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Bad request',
      });
    }
  })
  .use(async (req, res, next) => {
    // Check if job already exists

    const randomId = await NanoId();
    const title = req.validatedJob.title.toLowerCase().split(' ').join('-');
    const jobId = title.concat(randomId);

    req.validatedJob.jobId = jobId;

    req.validatedJob.created_at = new Date();
    req.validatedJob.updated_at = new Date();

    const job = await firestore.collection('jobs').doc(jobId).get();

    if (job.exists) {
      console.log('Job already exists');
      res.status(400).json({
        error: 'Job already exists',
      });
    }
    next();
  })
  .post(async (req, res) => {
    // Create new job

    try {
      await firestore
        .collection('jobs')
        .doc(req.validatedJob.jobId)
        .set({ ...req.validatedJob });

      res.status(201).json({
        message: 'Created job',
      });
    } catch (error) {
      res.status(200).json({
        message: 'Failed to job',
      });
    }
    res.status(200).json({
      job: req.validatedJob,
    });
  });

export default handler;
