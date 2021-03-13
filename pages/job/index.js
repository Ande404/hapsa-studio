/* eslint-disable camelcase */
import {
  Box,
  Heading,
  Grid,
  Flex,
  GridItem,
  Text,
  Input,
  Divider,
  Select,
  CheckboxGroup,
  Checkbox,
  Stack,
  Button,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import superjson from 'superjson';
import React from 'react';
import { Nav } from '../../components/Nav/Nav';
import { getAllJobId } from '../../firebase/firestore';
import JobListing from '../../components/JobListing';

const Jobs = ({ jobs }) => (
  <div>
    <Nav />
    <Box px={{ base: '16px', md: '40px', lg: '320px' }} mt="20">
      <Heading fontWeight="600" fontSize="22px" letterSpacing="-.8px" mb="6">
        Recently posted
      </Heading>
      <JobListing jobs={jobs} />
    </Box>
  </div>
);

export async function getStaticProps() {
  const rawJobs = await getAllJobId();

  // Firebase understands timestamps however Next.js only serializes JSON types see https://github.com/vercel/next.js/discussions/11498
  // superjson will cast timestamps to string
  const jobs = rawJobs.map((job) => superjson.serialize(job).json);

  return {
    props: { jobs },
  };
}

Jobs.propTypes = {
  jobs: PropTypes.array,
};

export default Jobs;
