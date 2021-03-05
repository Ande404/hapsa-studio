import nc from 'next-connect';
import cors from 'cors';
import fetch from 'node-fetch';
import { firebaseAdmin } from '../../lib/firebase-admin';
import { newApplication } from '../../lib/firestore';
const handler = nc()
  .use(cors())
  .get((req, res) => {
    res.status(200).json({
      status: 'applicant',
    });
  })
  .post(async (req, res) => {
    if ((!req.body && !req.body.user) || !req.body.job) {
      res.status(404).end('request body is not found... or is it');
    }

    const { user, job } = req.body;

    const application = {
      user,
      job,
    };

    const newApp = await newApplication(application);

    res.status(200).json({
      payload: 'working',
    });
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!');
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default handler;
