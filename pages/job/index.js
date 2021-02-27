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

const Jobs = ({ jobs }) => {
  return (
    <div>
      <Nav />
      <Flex
        mt='16'
        px={{ base: '24px', md: '40px', lg: '80px' }}
        direction='column'
      >
        <Heading letterSpacing='-1px'>Recently Posted</Heading>
        {jobs.map((job) => (
          <Box mt='12' key={job.id}>
            <NextLink href='/job/[jobId]' as={`/post/${job.id}`}>
              <Link>Job id {job.id}</Link>
            </NextLink>
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
