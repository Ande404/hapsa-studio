import React from 'react';
import nookies from 'nookies';
import { Box, Text, Heading } from '@chakra-ui/react';
import { Nav } from '../../components/Nav/Nav';
import { firebaseAdmin } from '../../firebase/admin';

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
        destination: '/register',
      },
      props: {},
    };
  }
}

const recruiter = () => (
  <div>
    <Nav />
    <Box mt="20" px={{ base: '16px', md: '40px', lg: '320px' }}>
      <Heading fontWeight="700" fontSize="22px" letterSpacing="-.8px">
        Recruiter
      </Heading>
    </Box>
  </div>
);

export default recruiter;
