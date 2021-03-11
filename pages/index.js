import Head from 'next/head';
import PropTypes from 'prop-types';
import { Center, Heading, Badge, Box, Text } from '@chakra-ui/react';
import { Nav } from '../components/Nav/Nav';
import { Hero } from '../components/Hero/Hero';
import Feature from '../components/Feature';
import { ActiveJobsHero } from '../lib/firestore';

export default function Home({ jobs }) {
  return (
    <>
      <Head>
        <title>Hapsa Studio</title>
      </Head>
      <Nav />
      <Hero jobs={jobs} />
      <Center px={{ base: '4', md: '40px', lg: '160px' }} my="20">
        <Box>
          <Badge colorScheme="green" mb="2">
            Success
          </Badge>
          <Heading letterSpacing="-.6px">
            Keep your job applications in one place
          </Heading>
          <Box h="240px" bg="gray.900" rounded="sm" mt="12" />
        </Box>
      </Center>
    </>
  );
}

export async function getStaticProps() {
  const jobs = await ActiveJobsHero();
  return {
    props: {
      jobs,
    },
  };
}
Home.propTypes = {
  jobs: PropTypes.array,
};
