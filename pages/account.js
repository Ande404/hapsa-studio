import nookies from 'nookies';
import Form from '../components/Form';
import { firebaseAdmin } from '../lib/admin';
import { getPublicJobs } from '../lib/db';
import { firebaseClient } from '../lib/firebase-client';
import Link from 'next/Link';
export async function getServerSideProps(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email, name } = token;

    return {
      props: {
        message: `Welcome ${name}. Your email is ${email} and your UID is ${uid}.`,
        token,
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
  const { name, email, picture } = props?.token;
  return (
    <>
      My account
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
          <h2>{name}</h2>
          <img src={picture} />
        </div>
      </div>
      <Link href='/dashboard'>
        <a>← Dashboard</a>
      </Link>
    </>
  );
};

export default dashboard;
