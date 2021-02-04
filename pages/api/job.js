import nc from 'next-connect';
import morgan from 'morgan';
import Cors from 'cors';
import { firestore } from '../../lib/firebase-client';
import { nanoid } from 'nanoid/async';
import Joi from 'joi';

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

    const jobSchema = Joi.object().keys({
      jobId: Joi.string().alphanum().min(3).max(18).required(),
      title: Joi.string(),
      industry_tags: Joi.array().unique(),
    });

    const result = Joi.validate(body, jobSchema);
    const { value, error } = result;
    const valid = error == null;

    if (!valid) {
      res.status(422).json({
        message: 'Invalid request',
        data: body,
      });
    } else {
      res.json({ message: 'Resource created', data: value });
      res.status(200);
    }

    const randomId = await nanoid();

    const title = req.body.title.toLowerCase().split(' ').join('-');
    const jobId = title.concat(randomId);

    // firestore
    //   .collection('jobs')
    //   .doc(jobId)
    //   .set({ ...rawJob, jobId });
    // res.status(200).json({
    //   msg: 'Job created successfully ✅',
    // });
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!');
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default handler;
