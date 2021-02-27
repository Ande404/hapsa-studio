import {
  Box,
  Heading,
  Text,
  Flex,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  HStack,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { FiBriefcase } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { getAllJobId, getJobById } from '../../lib/firestore';
import NextLink from 'next/link';
import Nav from '../../components/Nav';
const Job = ({ job }) => {
  console.log(job);

  return (
    <div>
      <Nav />
      <SimpleGrid
        mt='16'
        columns={{ base: 1, lg: 2 }}
        mx={{ base: '24px', md: '40px', lg: '340px' }}
        gap='20'
      >
        <Box>
          <Heading letterSpacing='-1.2px'>{job.title}</Heading>
          <HStack spacing={4} py='2'>
            {job.industry_tags.map((tag) => (
              <Tag size='md' key={tag} variant='solid' colorScheme='blue'>
                <TagLeftIcon as={FiBriefcase} />
                <TagLabel> {tag}</TagLabel>
              </Tag>
            ))}
          </HStack>
          <Text>{job.governorate}</Text>
          <Text>{job.descripton}</Text>
          <Text>{job.recruiter}</Text>
        </Box>
        <Box borderWidth='1px' p='4' rounded='lg'>
          <Button>Apply Now</Button>
        </Box>
      </SimpleGrid>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const job = await getJobById(params.jobId);

  if (!job) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { job },
  };
}

export async function getStaticPaths() {
  const allJobs = await getAllJobId();

  return {
    paths: allJobs.map((job) => {
      return {
        params: {
          jobId: job.id,
        },
      };
    }),
    fallback: true,
  };
}

export default Job;
