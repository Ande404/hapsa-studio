import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import { CopyIcon } from '@chakra-ui/icons';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import {
  Box,
  Heading,
  Text,
  GridItem,
  Button,
  Grid,
  Flex,
  ButtonGroup,
  useClipboard,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import { useAuth } from '../../context/auth';
import { getAllJobId, getJobById } from '../../lib/firestore';
import { Nav } from '../../components/Nav/Nav';
import JobModal from '../../components/JobModal';

const Job = ({ job }) => {
  const url =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000`
      : `prod-link`;
  // concat copy value with url in prod

  const router = useRouter();

  const { user } = useAuth();
  const cookies = parseCookies();

  const { hasCopied, onCopy } = useClipboard(url.concat(router.asPath));
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (hasCopied) {
    console.log('just copied');
  }

  const sendApplication = async () => {
    if (user && cookies.token) {
      const response = await fetch('/api/apply', {
        method: 'post',
        body: JSON.stringify(job),
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    }
    console.log('User is not logged in');
  };

  // console.log(`/api/apply/${router.query.jobId}`)

  return (
    <div>
      <Nav />
      <JobModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        job={job}
        token={cookies.token}
        sendApplication={sendApplication}
      />
      <Box px={{ base: '16px', md: '40px', lg: '160px' }}>
        <Grid mt="28" templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap="20">
          <GridItem rowSpan={2}>
            <Heading letterSpacing="-1.2px">{job?.title}</Heading>
            <ButtonGroup variant="outline" spacing="6" my="8">
              <Flex
                direction={{ base: 'column', lg: 'row' }}
                justify="center"
                align={{ base: 'start', lg: 'center' }}
              >
                <Button
                  colorScheme="facebook"
                  size="sm"
                  leftIcon={<FaFacebook />}
                >
                  Share on Facebook
                </Button>

                <Button
                  size="sm"
                  colorScheme="twitter"
                  leftIcon={<FaTwitter />}
                  mx={{ base: 0, lg: 2 }}
                  my={{ base: 2, lg: 0 }}
                >
                  Share on Twitter
                </Button>
                <Button
                  size="sm"
                  colorScheme="black"
                  leftIcon={<CopyIcon />}
                  onClick={onCopy}
                >
                  Copy URL
                </Button>
              </Flex>
            </ButtonGroup>

            <Text>{job?.descripton}</Text>
          </GridItem>
          <GridItem borderWidth="1px" p="4" rounded="lg">
            <Image
              borderRadius="full"
              boxSize="65px"
              src="https://logos-download.com/wp-content/uploads/2016/11/EA_logo_black.png"
              alt="some-alt"
            />
            <Text fontSize="sm" mt="4">
              Recruiter
            </Text>
            <Heading size="md" letterSpacing="-.2px" mt="2">
              {job?.recruiter}
            </Heading>

            <Text fontSize="sm" pt="4">
              Job Type
            </Text>

            <Heading size="md" letterSpacing="-.2px" mt="2">
              {job?.job_type}
            </Heading>

            <Text fontSize="sm" pt="4">
              Location
            </Text>

            <Heading size="md" letterSpacing="-.2px" mt="2">
              {job?.governorate}
            </Heading>

            <Text fontSize="sm" pt="4">
              Career level
            </Text>

            <Heading size="md" letterSpacing="-.2px" mt="2">
              {job?.career_level}
            </Heading>

            <Button
              onClick={onOpen}
              w={{ base: '100%', md: 'auto' }}
              type="submit"
              size="md"
              bg="gray.900"
              color="gray.100"
              _hover={{
                color: 'gray.100',
                bg: 'gray.700',
              }}
              mt="8"
            >
              Apply Now
            </Button>
          </GridItem>
        </Grid>
      </Box>
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
    paths: allJobs.map((job) => ({
      params: {
        jobId: job.id,
      },
    })),
    fallback: true,
  };
}

Job.propTypes = {
  job: PropTypes.object,
  title: PropTypes.string,
};

export default Job;
