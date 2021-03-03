import {
  Box,
  Heading,
  Link,
  Grid,
  Flex,
  SimpleGrid,
  GridItem,
  Tag,
  Text,
  TagLabel,
  Input,
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
        my='16'
      ></Box>
      <Grid
        px={{ base: '24px', md: '40px', lg: '80px' }}
        templateRows='repeat(1, 1fr)'
        templateColumns={{ base: 'inherit', lg: 'repeat(8, 1fr)' }}
        py='16'
        gridRowGap='16'
      >
        <GridItem
          colSpan={2}
          maxH='420px'
          borderWidth='1px'
          w='100%'
          rounded='sm'
        >
          <Box p='4' w='100%'>
            <Text fontWeight='semibold' fontSize='lg'>
              Filter
            </Text>
            <Input
              placeholder='Search by title or company'
              variant='outline'
              my='6'
              size='md'
              fontSize='sm'
            />
          </Box>
        </GridItem>
        <GridItem
          colSpan={4}
          mt={{ base: '16', lg: 0 }}
          ml={{ base: 0, lg: 16 }}
        >
          <Heading letterSpacing='-1px' pb='12' size='md' fontWeight='semibold'>
            Recently Posted
          </Heading>

          <JobListing jobs={jobs} />
        </GridItem>
        <GridItem colSpan={2}>
          <Box>hello</Box>
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
