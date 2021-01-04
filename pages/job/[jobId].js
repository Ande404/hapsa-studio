import { useRouter } from 'next/router';
import { getPublicJobs } from '../../lib/db';

const Job = () => {
  const router = useRouter();
  const { jobId } = router.query;

  return <p>Job: {jobId}</p>;
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
