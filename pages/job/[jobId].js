import { useRouter } from 'next/router';

export async function getStaticProps(ctx) {
  const jobId = ctx.params.jobId;
  
  const { jobData } = await getAllJobs();
  console.log(jobData);

  return {
    props: {
      jobPayload: jobData,
    },
    revalidate: 1,
  };
}


export default function Job({ jobPayload }) {
  const router = useRouter();
  return <div>Job ID: {router.query.jobId}</div>;
}
