import nookies from 'nookies';
import { firebaseAdmin } from '../lib/admin';
import firebase from '../lib/firebase';

export async function getServerSideProps(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const { uid, email } = token;

    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();

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
    <div>
      Dashboard
      <p>{props.message}</p>
      <button
        onClick={async () => {
          await firebase.auth().signOut();
          window.location.href = '/';
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default dashboard;
