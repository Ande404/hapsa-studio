import Head from 'next/head';
import PropTypes from 'prop-types';
import { Flex, Heading, Badge, Box, Text } from '@chakra-ui/react';
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

      <Flex px={{ base: '16px', md: '40px', lg: '220px' }} my="20">
        <Box>
          <Badge mb="2" px="2" py="1">
            Success
          </Badge>
          <Heading letterSpacing="-.6px">
            Keep your job applications in one place
          </Heading>
          <Box h="240px" bg="gray.900" rounded="sm" mt="12" />
        </Box>
      </Flex>
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
