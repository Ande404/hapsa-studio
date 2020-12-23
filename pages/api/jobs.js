import nextConnect from 'next-connect';
import Cors from 'cors';
import morgan from 'morgan';
import { createJob } from '../../lib/db';

const handler = nextConnect({ onError, onNoMatch });

const cors = Cors();

function onError(req, res) {
  res.status(501).json({ message: 'server error' });
}

function onNoMatch(req, res) {
  res.status(404).end('page is not found... or is it');
}

export default handler
  .use(cors)
  .use(morgan(':method :url :status :res[content-length] - :response-time ms'))
  .get(async (req, res) => {
    res.send('Hello world');
  })
  .post(async (req, res) => {
    const rawJob = req.body;
    createJob(rawJob).catch((err) => {
      res.json(`Error`).status(501);
    });
    res.json(`Success`);
  });
