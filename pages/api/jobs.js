import nextConnect from 'next-connect';
import Cors from 'cors';
import morgan from 'morgan';
import { createJob } from '../../lib/db';

const cors = Cors();

function onError(req, res) {
  res.status(501).json({ message: 'server error' });
}

function onNoMatch(req, res) {
  res.status(404).end('page is not found... or is it');
}

const handler = nextConnect({ onError, onNoMatch });

export default handler
  .use(cors)
  .use(morgan(':method :url :status :res[content-length] - :response-time ms'))
  .get(async (req, res) => {
    res.send('Hello world');
  })
  .post(async (req, res) => {
    if (!req.body) {
      res.status(404).end('request body is not found... or is it');
    }
    const rawJob = req.body;
    createJob(rawJob);
    res.status(200).end('Job created ✅');
  });
