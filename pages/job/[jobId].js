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
} from '@chakra-ui/react';

const Job = ({ job }) => {
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

      <ChakraContainer>
        <Grid mt='20' templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap='20'>
          <GridItem rowSpan={2}>
            <Heading letterSpacing='-1.2px'>{job?.title}</Heading>

            <ButtonGroup variant='outline' spacing='6' my='6'>
              <Flex direction={{ base: 'column', lg: 'row' }}>
                <Button
                  colorScheme='facebook'
                  size='sm'
                  leftIcon={<FaFacebook />}
                >
                  Share on Facebook
                </Button>
                <Button
                  ml='3'
                  size='sm'
                  colorScheme='twitter'
                  leftIcon={<FaTwitter />}
                >
                  Share on Twitter
                </Button>
                <Button
                  ml='3'
                  size='sm'
                  colorScheme='black'
                  leftIcon={<CopyIcon />}
                  onClick={onCopy}
                >
                  Copy URL
                </Button>
              </Flex>
            </ButtonGroup>

            <Text>{job?.governorate}</Text>
            <Text>{job?.descripton}</Text>
            <Text>{job?.recruiter}</Text>
          </GridItem>
          <GridItem borderWidth='1px' p='4' rounded='lg'>
            <Text fontSize='sm' pb='2'>
              Recruiter
            </Text>
            <Heading size='md' letterSpacing='-.6px'>
              Angela Cosmos
            </Heading>
            <Button onClick={() => sendApplication()} my='4'>
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
