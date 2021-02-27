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
import Nav from '../../components/Nav';
import { getAllJobId } from '../../lib/firestore';
import NextLink from 'next/link';
import JobListing from '../../components/JobListing';

const Jobs = ({ jobs }) => {
  return (
    <div>
      <Nav />
      <Box
        bg='gray.200'
        h='320px'
        mx={{ base: '24px', md: '40px', lg: '80px' }}
        mt='8'
        mb='16'
      ></Box>
      <Grid
        px={{ base: '24px', md: '40px', lg: '80px' }}
        templateRows='repeat(1, 1fr)'
        templateColumns={{ base: 'inherit', lg: 'repeat(5, 1fr)' }}
      >
        <GridItem colSpan={1} bg='gray.400' maxH='420px'>
          <Box p='6' w='100%'>
            hi
          </Box>
        </GridItem>
        <GridItem
          colSpan={4}
          mt={{ base: '16', lg: 0 }}
          ml={{ base: 0, lg: 16 }}
        >
          <Heading letterSpacing='-1px' pb='12' size='lg'>
            Recently Posted
          </Heading>

          <JobListing jobs={jobs} />
        </GridItem>
      </Grid>
    </div>
  );
};

export async function getStaticProps() {
  const jobs = await getAllJobId();

  return {
    props: { jobs },
  };
}

export default Jobs;
