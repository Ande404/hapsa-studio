import Head from 'next/head';
import PropTypes from 'prop-types';
import Nav from '../components/Nav';
import { Hero } from '../components/Hero';
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
      <Feature />
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
