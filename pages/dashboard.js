import nookies from 'nookies';
import { firebaseAdmin } from '../lib/admin';
import { getPublicJobs } from '../lib/firestore';
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
    const { uid, email, name } = token;

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
const dashboard = (props) => {
  const logout = async () => {
    await firebaseClient.auth().signOut();
    window.location.href = '/';
  };

  console.log(props.publicJobs);
  return (
    <>
      <Nav status={props.token} logout={logout} />

      <Flex
        mt='16'
        px={{ base: '24px', md: '40px', lg: '340px' }}
        direction='column'
      >
        {props.publicJobs.map((el) => (
          <Box mt='12' key={el.id}>
            <Link
              _hover={{ textDecoration: 'none' }}
              href='/job/systems-engineeroo-ObZ-28JZAbt_TvTKNp'
            >
              <Box>
                <Heading as='h3' size='lg' letterSpacing='-1.2px'>
                  {el.data.title}
                </Heading>
                <Box mt='4'>
                  <Tag size='md' variant='solid' colorScheme='gray'>
                    <TagLabel>{el.data.career_level}</TagLabel>
                  </Tag>
                  <Tag size='md' variant='solid' colorScheme='gray' ml='3'>
                    <TagLabel>{el.data.governorate}</TagLabel>
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
