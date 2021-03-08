import nc from 'next-connect';
import morgan from 'morgan';
import Cors from 'cors';
import mailchimp from '@mailchimp/mailchimp_marketing';


mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER ,
  });

const cors = Cors({
  methods: ['GET', 'POST', 'HEAD', 'PUT'],
});

function onError(err, req, res, next) {
  res.status(500).end(err.toString());
}

function onNoMatch(req, res) {
  res.status(404).end('Resource not found');
}

const handler = nc({ onError, onNoMatch })

handler
  .use(morgan('tiny'), cors)
  .post(async (req, res) => {
    const { email } = req.body

    if (!email) {
        res.status(400).json({
            error: "Email is required"
        })
    }

    try {
        await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
            email_address: email,
            status: 'subscribed'
          });

          return res.status(201).json({ error: "", message: "subscribed" });

    } catch (error) {

        const { title, status, detial} = JSON.parse(error.response.text)

        switch (title) {
            case "Member Exists":
                return res.status(status).json({
                    error: "Email address already registered"
                })
            case "Invalid Resource":
                return res.status(status).json({
                    error: "Invaild email address"
                })
            default:
                return res.status(500).json({
                    error: "Server error"
                })
        }
    }
  })


export default handler;
