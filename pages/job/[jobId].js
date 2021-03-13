import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import { MDXProvider } from '@mdx-js/react';
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
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import * as matter from 'gray-matter';

import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import { useAuth } from '../../context/auth';
import { getAllJobId, getJobById } from '../../firebase/firestore';
import { Nav } from '../../components/Nav/Nav';
import JobModal from '../../components/JobModal';
import { SocialButtonGroup } from '../../components/SocialButtonGroup/SocialButtonGroup';

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
    if (user.uid && cookies.token) {
      try {
        const response = await fetch('/api/apply', {
          method: 'post',
          body: JSON.stringify({ uid: user.uid, jobId: job.jobId }),
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('User is not signed in');
    }
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
      <Box px={{ base: '16px', md: '40px', lg: '320px' }}>
        <Grid mt="28" templateColumns={{ base: '1fr', lg: '1fr' }}>
          <GridItem rowSpan={2}>
            <Heading letterSpacing="-1.2px" fontWeight="500">
              {job?.title}
            </Heading>
          </GridItem>
          <GridItem>
            <SocialButtonGroup onCopy={onCopy} />
          </GridItem>
          <GridItem rounded="lg" mt="10" mb="90px">
            <Image
              borderRadius="full"
              boxSize="65px"
              src="https://logos-download.com/wp-content/uploads/2016/11/EA_logo_black.png"
              alt="some-alt"
            />
            <Stack direction={['column', 'row']} spacing="30px" mt="6">
              <div>
                <Text fontSize="sm">Recruiter</Text>
                <Heading
                  as="h3"
                  size="md"
                  letterSpacing="-.2px"
                  mt="2"
                  fontWeight="500"
                >
                  {job?.recruiter}
                </Heading>
              </div>

              <div>
                <Text fontSize="sm">Job Type</Text>

                <Heading
                  as="h3"
                  size="md"
                  letterSpacing="-.2px"
                  mt="2"
                  fontWeight="500"
                >
                  {job?.job_type}
                </Heading>
              </div>

              <div>
                <Text fontSize="sm">Location</Text>

                <Heading
                  as="h3"
                  size="md"
                  letterSpacing="-.2px"
                  mt="2"
                  fontWeight="500"
                >
                  {job?.governorate}
                </Heading>
              </div>

              <div>
                <Text fontSize="sm">Career level</Text>

                <Heading
                  as="h3"
                  size="md"
                  letterSpacing="-.2px"
                  mt="2"
                  fontWeight="500"
                >
                  {job?.career_level}
                </Heading>
              </div>
            </Stack>

            <Button
              onClick={user ? onOpen : null}
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
          {/* parse job.description. Markdown -> Html */}
          <GridItem>description here</GridItem>
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
