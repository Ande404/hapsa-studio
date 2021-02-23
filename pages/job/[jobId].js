import { Box, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getPublicJobs } from '../../lib/db';
import Nav from '../../components/Nav';
const Job = (props) => {
  const router = useRouter();
  const job = props.publicJobs[0].data;
  const { industry_tags, descripton, benefits } = job;

  return (
    <div>
      <Nav />
      <Box px={{ base: '24px', md: '40px', lg: '260px' }}>
        <Heading letterSpacing='-1'>{job.title}</Heading>
        <Text>{job.governorate}</Text>
        <Text>{descripton}</Text>
      </Box>
      {JSON.stringify(job)}
    </div>
  );
};

export async function getStaticProps(context) {
  const publicJobs = await getPublicJobs();

  if (!publicJobs) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { publicJobs },
  };
}

export async function getStaticPaths() {
  const publicJobs = await getPublicJobs();

  return {
    paths: publicJobs.map((el) => {
      return {
        params: {
          jobId: el.id,
        },
      };
    }),
    fallback: true,
  };
}

export default Job;
