import nc from 'next-connect';
import cors from 'cors';
import fetch from 'node-fetch';
import { firebaseAdmin } from '../../lib/admin';
import { NewApplication } from '../../lib/firestore';
const handler = nc()
  .use(cors())
  .get((req, res) => {
    res.send('Hello no');
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

    await NewApplication(application);

    res.status(200).json({
      payload: 'working',
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
