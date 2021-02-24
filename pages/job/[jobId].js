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
const Job = (props) => {
  const router = useRouter();

  return (
    <div>
      <Nav />
      <NextLink href='/dashboard'>
        <a>dashboard</a>
      </NextLink>
      <SimpleGrid
        mt='16'
        columns={{ base: 1, lg: 2 }}
        mx={{ base: '24px', md: '40px', lg: '340px' }}
        gap='20'
      >
        {JSON.stringify(props.job)}
        {/* <Box>
          <Heading letterSpacing='-1.2px'>{job.title}</Heading>
          <HStack spacing={4} py='2'>
            {industry_tags.map((tag) => (
              <Tag size='md' key={tag} variant='solid' colorScheme='blue'>
                <TagLeftIcon as={FiBriefcase} />
                <TagLabel> {tag}</TagLabel>
              </Tag>
            ))}
          </HStack>
          <Text>{job.governorate}</Text>
          <Text>{descripton}</Text>
        </Box>
        <Box borderWidth='1px' p='4' rounded='lg'>
          <Button>Apply Now</Button>
        </Box> */}
      </SimpleGrid>
    </div>
  );
};

export async function getStaticProps({ params }) {
  // get job by id

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
  // get job ith params id

  return {
    paths: posts.map((post) => {
      return {
        params: {
          jobId: post,
        },
      };
    }),
    fallback: true,
  };
}

export default Job;
