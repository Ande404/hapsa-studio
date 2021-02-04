import nc from 'next-connect';
import morgan from 'morgan';
import Cors from 'cors';
import { firebaseAdmin } from '../../lib/admin';

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

  .post(async (req, res) => {
    if (!req.body) {
      res.status(404).end('request body is not found... or is it');
    }

    await firebaseAdmin
      .auth()
      .verifyIdToken(req.body.user)
      .then((decodedToken) => {
        res.status(200).json({
          token: decodedToken,
        });
      })
      .catch((error) => {
        res.status(400).json({
          token: 'none hoe',
          err: error,
        });
      });
  });

export default handler;
