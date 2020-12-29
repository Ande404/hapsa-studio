import nookies from 'nookies';
import Form from '../components/Form';
import { firebaseAdmin } from '../lib/admin';
import { getPublicJobs } from '../lib/db';
import { firebaseClient } from '../lib/firebase-client';

export async function getServerSideProps(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email, name } = token;

    const publicJobs = await getPublicJobs();

    return {
      props: {
        message: `Welcome ${name}. Your email is ${email} and your UID is ${uid}.`,
        token,
        publicJobs,
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };
  }
}
const dashboard = (props) => {
  return (
    <>
      Dashboard
      <div style={{ marginTop: '2rem' }}>
        <p>{props.message}</p>
        <button
          onClick={async () => {
            await firebaseClient.auth().signOut();
            window.location.href = '/';
          }}
        >
          Sign out
        </button>

        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ marginBottom: '3rem' }}>Jobs</h3>
          {props.publicJobs.map((el) => (
            <div key={el.id}>
              <p>{el.data.company}</p>
              <p>{el.data.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default dashboard;
