import React from 'react';
import nookies from 'nookies';
import { Box } from '@chakra-ui/react';
import Nav from '../components/Nav';
import { firebaseAdmin } from '../lib/firebase-admin';

export async function getServerSideProps(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      props: {
        user,
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

const recruiter = () => (
  <div>
    <Nav />
    <Box>recruiter page</Box>
  </div>
);

export default recruiter;
