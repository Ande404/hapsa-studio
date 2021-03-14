import Head from 'next/head';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';
import { Nav } from '../../components/Nav/Nav';
import { Hero } from '../../components/Hero/Hero';
import Feature from '../../components/Feature';
import { ActiveJobsHero } from '../../firebase/firestore';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button/Button';

export default function Home({ jobs }) {
  return (
    <>
      <Head>
        <title>Hapsa Studio</title>
      </Head>
      <Nav />
      <Hero jobs={jobs} />
      <Feature />
      <Feature />
      <Feature />
      <Footer />
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
