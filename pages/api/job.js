import Cors from 'cors';
import { firebaseClient } from '../../lib/firebase-client';
const firestore = firebaseClient.firestore();

const cors = Cors({
  methods: ['GET', 'POST', 'HEAD'],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

async function handler(req, res) {
  await runMiddleware(req, res, cors);
  switch (req.method) {
    case 'GET':
      const jobs = [];
      const snapshot = await firestore.collection('jobs').get();
      snapshot.forEach((doc) => {
        jobs.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      res.json(jobs);

    case 'POST':
      if (!req.body) {
        res.status(404).end('request body is not found... or is it');
      }
      const rawJob = req.body;
      firestore.collection('jobs').add(rawJob);
      res.status(200).end('Job created ✅');
    default:
      res.status(405).end(); //Method Not Allowed
  }
}

export default handler;

// import nextConnect from 'next-connect';
// import Cors from 'cors';
// import morgan from 'morgan';
// import { createJob, getAllJobs } from '../../lib/db';
// import { firebaseClient } from '../../lib/firebase';
// const firestore = firebaseClient.firestore();
// const cors = Cors();

// function onError(_, res) {
//   res.status(501).json({ message: 'server error' });
// }

// function onNoMatch(_, res) {
//   res.status(404).end('page is not found... or is it');
// }

// const handler = nextConnect({ onError, onNoMatch });

// export default handler
//   .use(cors)
//   .use(morgan(':method :url :status :res[content-length] - :response-time ms'))
//   .get(async (req, res) => {
//     const jobsRef = db.collection('jobs');
//     const queryRef = jobsRef.where('jobLocation', '==', 'Erbil');
//     res.send({
//       message: 'Hello',
//     });
//   })
//   .post(async (req, res) => {
//     if (!req.body) {
//       res.status(404).end('request body is not found... or is it');
//     }
//     const rawJob = req.body;
//     createJob(rawJob);
//     res.status(200).end('Job created ✅');
//   });
