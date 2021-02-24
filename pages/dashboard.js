import nookies from 'nookies';
import { firebaseAdmin } from '../lib/admin';
import { getAllJobId, getPublicJobs } from '../lib/firestore';
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
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import NextLink from 'next/link';
export async function getServerSideProps(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const jobs = await getAllJobId();
    const { uid, email, name } = token;

    return {
      props: {
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
const dashboard = ({ token, jobs }) => {
  console.log(jobs);

  const logout = async () => {
    await firebaseClient.auth().signOut();
    window.location.href = '/';
  };

  return (
    <>
      <Nav status={token} logout={logout} />

      <Flex
        mt='16'
        px={{ base: '24px', md: '40px', lg: '340px' }}
        direction='column'
      >
        {jobs.map((job) => (
          <Box mt='12' key={job.id}>
            <Link _hover={{ textDecoration: 'none' }} href={`job/${job.id}`}>
              <Box>
                <Heading as='h3' size='lg' letterSpacing='-1.2px'>
                  {job.data.title}
                </Heading>
                <Box mt='4'>
                  <Tag size='md' variant='solid' colorScheme='gray'>
                    <TagLabel>{job.data.career_level}</TagLabel>
                  </Tag>
                  <Tag size='md' variant='solid' colorScheme='gray' ml='3'>
                    <TagLabel>{job.data.governorate}</TagLabel>
                  </Tag>
                </Box>
              </Box>
            </Link>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default dashboard;
