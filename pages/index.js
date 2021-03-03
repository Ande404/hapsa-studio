import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Block from '../components/Block';
import { Newsletter } from '../components/Newsletter';
import Head from 'next/head';
import { Hero } from '../components/Hero';
import Feature from '../components/Feature';
import { ActiveJobsHero } from '../lib/firestore';
export default function Home({ jobs }) {
  return (
    <>
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
