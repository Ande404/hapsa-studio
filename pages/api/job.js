import nc from 'next-connect';
import morgan from 'morgan';
import Cors from 'cors';
import { nanoid } from 'nanoid/async';
import { createJob } from '../../lib/firestore';

const cors = Cors({
  methods: ['GET', 'POST', 'HEAD', 'PUT'],
});

function onError(err, req, res, next) {
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
  .post(async (req, res) => {
    const { body } = req;
    if (!body) {
      res.status(404).end('request body is not found... or is it');
    }

    const randomId = await nanoid();

    const title = req.body.title.toLowerCase().split(' ').join('-');
    const jobId = title.concat(randomId);

    const job = await createJob(jobId, body);

    res.status(200).json({
      msg: 'Job created successfully ✅',
      data: job,
    });
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!');
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default handler;
