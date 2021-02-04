import nc from 'next-connect';
import cors from 'cors';
import fetch from 'node-fetch';
import { firebaseAdmin } from '../../lib/admin';

const handler = nc()
  .use(cors())
  .get((req, res) => {
    res.send('Hello no');
  })
  .post(async (req, res) => {
    if (!req.body) {
      res.status(404).end('request body is not found... or is it');
    }
    res.status(200).json({
      msg: 'hello',
    });
    // firebaseAdmin.admin
    //   .auth()
    //   .verifyIdToken(req.body.user)
    //   .then((decodedToken) => {
    //     res.status(200).json({
    //       token: decodedToken,
    //     });
    //   })
    //   .catch((error) => {
    //     res.status(400).json({
    //       token: 'none hoe',
    //       err: error,
    //     });
    //   });
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!');
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default handler;
