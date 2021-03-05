import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChakraContainer } from '../../components/atoms/Container';
import fetch from 'node-fetch';
import { useAuth } from '../../context/auth';
import { getAllJobId, getJobById } from '../../lib/firestore';
import { CopyIcon } from '@chakra-ui/icons';
import Nav from '../../components/Nav';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import {
  Heading,
  Text,
  GridItem,
  Button,
  Grid,
  Flex,
  ButtonGroup,
  useClipboard,
  Image,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import JobModal from '../../components/JobModal';

const Job = ({ job }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const url =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000`
      : `prod-link`;
  // concat copy value with url in prod
  const { hasCopied, onCopy } = useClipboard(url.concat(router.asPath));

  if (hasCopied) {
    console.log('just copied');
  }

  const [applyPayload, setApplyPayload] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setApplyPayload({
        job: job,
        user: user,
      });
    }, 1000);
  }, [user]);

  const sendApplication = async () => {
    if (applyPayload.user == undefined) {
      console.log('User is not logged in');
      return;
    }
    const response = await fetch('http://localhost:3000/api/manage', {
      method: 'post',
      body: JSON.stringify(applyPayload),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <Nav />

      <JobModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} job={job} />

      <ChakraContainer>
        <Grid mt='28' templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap='20'>
          <GridItem rowSpan={2}>
            <Heading letterSpacing='-1.2px'>{job?.title}</Heading>

            <ButtonGroup variant='outline' spacing='6' my='8'>
              <Flex
                direction={{ base: 'column', lg: 'row' }}
                justify='center'
                align={{ base: 'start', lg: 'center' }}
              >
                <Button
                  colorScheme='facebook'
                  size='sm'
                  leftIcon={<FaFacebook />}
                >
                  Share on Facebook
                </Button>

                <Button
                  size='sm'
                  colorScheme='twitter'
                  leftIcon={<FaTwitter />}
                  mx={{ base: 0, lg: 2 }}
                  my={{ base: 2, lg: 0 }}
                >
                  Share on Twitter
                </Button>
                <Button
                  size='sm'
                  colorScheme='black'
                  leftIcon={<CopyIcon />}
                  onClick={onCopy}
                >
                  Copy URL
                </Button>
              </Flex>
            </ButtonGroup>

            <Text>{job?.descripton}</Text>
          </GridItem>
          <GridItem borderWidth='1px' p='4' rounded='lg'>
            <Image
              borderRadius='full'
              boxSize='65px'
              src='https://logos-download.com/wp-content/uploads/2016/11/EA_logo_black.png'
              alt='some-alt'
            />
            <Text fontSize='sm' mt='4'>
              Recruiter
            </Text>
            <Heading size='md' letterSpacing='-.2px' mt='2'>
              {job?.recruiter}
            </Heading>

            <Text fontSize='sm' pt='4'>
              Job Type
            </Text>

            <Heading size='md' letterSpacing='-.2px' mt='2'>
              {job?.job_type}
            </Heading>

            <Text fontSize='sm' pt='4'>
              Location
            </Text>

            <Heading size='md' letterSpacing='-.2px' mt='2'>
              {job?.governorate}
            </Heading>

            <Text fontSize='sm' pt='4'>
              Career level
            </Text>

            <Heading size='md' letterSpacing='-.2px' mt='2'>
              {job?.career_level}
            </Heading>

            <Button
              onClick={onOpen}
              w={{ base: '100%', md: 'auto' }}
              type='submit'
              size='md'
              bg='gray.900'
              color='gray.100'
              _hover={{
                color: 'gray.100',
                bg: 'gray.700',
              }}
              mt='8'
            >
              Apply Now
            </Button>
          </GridItem>
        </Grid>
      </ChakraContainer>
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
