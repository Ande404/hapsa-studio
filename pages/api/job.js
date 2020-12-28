import nc from 'next-connect';
import morgan from 'morgan';
import Cors from 'cors';
import { firebaseClient, firestore } from '../../lib/firebase-client';

const cors = Cors({
  methods: ['GET', 'POST', 'HEAD', 'PUT'],
});

function onError(err, req, res, next) {
  logger.log(err);
  res.status(500).end(err.toString());
}

function onNoMatch(req, res) {
  res.status(404).end('page is not found... or is it');
}

const handler = nc({ onError, onNoMatch })
  .use(morgan('tiny'), cors)
  .get(async (req, res) => {
    const jobs = [];
    const snapshot = await firestore.collection('jobs').get();
    snapshot.forEach((doc) => {
      jobs.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.json(jobs);
  })
  .post((req, res) => {
    if (!req.body) {
      res.status(404).end('request body is not found... or is it');
    }
    const rawJob = req.body;
    firestore.collection('jobs').add(rawJob);
    res.status(200).end('Job created ✅');
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!');
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default handler;
