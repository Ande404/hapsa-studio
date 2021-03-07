import nc from 'next-connect';
import cors from 'cors';
import fetch from 'node-fetch';
import morgan from 'morgan';
import { firebaseAdmin } from '../../lib/firebase-admin';

const db = firebaseAdmin.firestore();

const handler = nc()
  .use(cors())
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
  .get((req, res) => {
    res.status(401).json({
      message: 'Access resrcited',
    });
  })
  .post(async (req, res) => {
    const job = JSON.parse(req.body);
    const user = req.currentUser;

    if (!job) {
      res.status(400).json({
        error: 'Bad request',
      });
    }

    const exists = await db
      .collection('users')
      .doc(user.uid)
      .collection('applications')
      .where('job', '==', job.jobId)
      .get();

    if (!exists.empty) {
      res.status(400).json({
        error: 'Bad request',
      });
      return;
    }

    // create new job application
    await db.collection('applications').add({
      user: user.uid,
      job: job.jobId,
      time_applied: new Date().getTime(),
    });

    // update user's list of job applications
    await db.collection('users').doc(user.uid).collection('applications').add({
      job: job.jobId,
    });

    // update job's list of applicants
    await db.collection('jobs').doc(job.jobId).collection('applicants').add({
      user: user.uid,
    });

    res.status(201).json({
      message: 'Application submitted',
    });
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!');
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default handler;
