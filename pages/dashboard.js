import nookies from 'nookies';
import { firebaseAdmin } from '../lib/admin';
import { getPublicJobs } from '../lib/db';
import { firebaseClient } from '../lib/firebase-client';
import Nav from '../components/Nav';
import fetch from 'node-fetch';
import { Box, Heading, Link, SimpleGrid } from '@chakra-ui/react';
import NextLink from 'next/link';
export async function getServerSideProps(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email, name } = token;
    const publicJobs = await getPublicJobs();
    return {
      props: {
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
  const logout = async () => {
    await firebaseClient.auth().signOut();
    window.location.href = '/';
  };
  return (
    <>
      <Nav status={props.token} logout={logout} />
      <Box px={{ base: '24px', md: '40px' }} mt='20'>
        <Heading
          as='h2'
          fontWeight='bold'
          size='md'
          letterSpacing='-0.8px'
          mb='6'
        >
          Recently posted
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing='40px' mt='8'>
          {props.publicJobs.map((el) => (
            <NextLink href={`job/${el.id}`} passHref key={el.id}>
              <Link _hover={{ textDecoration: 'none' }}>
                <Box key={el.id}>
                  <Heading as='h3' size='md'>
                    {el.data.title}
                  </Heading>
                  <p>{el.data.career_level}</p>
                  <p>{el.data.governorate}</p>
                  <p>{el.data.descripton}</p>
                </Box>
              </Link>
            </NextLink>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default dashboard;
