import nookies from 'nookies';
import { firebaseAdmin } from '../lib/admin';
import { getPublicJobs } from '../lib/db';
import { firebaseClient } from '../lib/firebase-client';
import Nav from '../components/Nav';
import fetch from 'node-fetch';
import Image from 'next/image';

import {
  Box,
  Heading,
  Link,
  Grid,
  Flex,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';
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

      <Flex mt='16' px={{ base: '24px', md: '40px', lg: '340px' }}>
        <GridItem colSpan={4}>
          <Flex>
            {props.publicJobs.map((el) => (
              <Box>
                <NextLink href={`job/${el.id}`} passHref key={el.id}>
                  <Link _hover={{ textDecoration: 'none' }}>
                    <Box key={el.id}>
                      <Heading as='h3' size='lg'>
                        {el.data.title}
                      </Heading>
                      <p>{el.data.career_level}</p>
                      <p>{el.data.governorate}</p>
                      <p>{el.data.descripton}</p>
                    </Box>
                  </Link>
                </NextLink>
              </Box>
            ))}
          </Flex>
        </GridItem>
      </Flex>
      {/* <Grid
        px={{ base: '24px', md: '40px', lg: '340px' }}
        rounded='lg'
        columns={{ base: 1, lg: 3 }}
        gap='16'
        mt='12'
      >
        <Box
          rounded='lg'
          p='6'
          color='white'
          bgGradient='linear(to right, gray.900, gray.800)'
        >
          <Heading
            as='h2'
            fontWeight='bold'
            size='md'
            letterSpacing='-0.5px'
            mb='6'
          >
            Looking for new talents?
          </Heading>
          <Image src='/doodle.png' alt='doodle' width={320} height={320} />
        </Box>

        <Flex mt='8'>
          {props.publicJobs.map((el) => (
            <NextLink href={`job/${el.id}`} passHref key={el.id}>
              <Link _hover={{ textDecoration: 'none' }}>
                <Box key={el.id}>
                  <Heading as='h3' size='lg'>
                    {el.data.title}
                  </Heading>
                  <p>{el.data.career_level}</p>
                  <p>{el.data.governorate}</p>
                  <p>{el.data.descripton}</p>
                </Box>
              </Link>
            </NextLink>
          ))}
        </Flex>
      </Grid> */}
    </>
  );
};

export default dashboard;
