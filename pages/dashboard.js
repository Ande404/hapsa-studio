import nookies from 'nookies';
import Form from '../components/Form';
import { firebaseAdmin } from '../lib/admin';
import { firebaseClient } from '../lib/firebase-client';
const firestore = firebaseClient.firestore();

export async function getServerSideProps(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email, name } = token;

    const jobs = [];
    const snapshot = await firestore.collection('jobs').get();
    snapshot.forEach((doc) => {
      jobs.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    return {
      props: {
        message: `Welcome ${name}. Your email is ${email} and your UID is ${uid}.`,
        token,
        jobs,
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
export default Dashboard = (props) => {
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
          {props.jobs.map((el) => (
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
