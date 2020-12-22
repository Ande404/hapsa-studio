import nc from 'next-connect';
import runMiddleware from '../../middleware/init';

const handler = nc()
  .get(async (req, res) => {
    res.send('Hello world');
  })
  .post(async (req, res) => {
    res.json({ hello: 'world' });
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!');
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default handler;
