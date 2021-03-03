import nookies from 'nookies';
import { firebaseAdmin } from '../lib/firebase-admin';
import { firebaseClient } from '../lib/firebase-client';
import Nav from '../components/Nav';
import { Box, Text } from '@chakra-ui/react';
import Form from '../components/Form';
export async function getServerSideProps(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      props: {
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
const dashboard = ({ token }) => {
  const logout = async () => {
    await firebaseClient.auth().signOut();
    window.location.href = '/';
  };

  return (
    <>
      <Nav status={token} logout={logout} />
      <Box px={{ base: '16px', md: '40px', lg: '160px' }}>
        <Text>Applied Jobs:</Text>
      </Box>
      <Form />
    </>
  );
};

export default dashboard;
