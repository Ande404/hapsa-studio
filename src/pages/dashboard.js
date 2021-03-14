import nookies from 'nookies';
import { Box, SimpleGrid, Heading } from '@chakra-ui/react';
import { firebaseAdmin } from '../../firebase/admin';
import { Nav } from '../../components/Nav/Nav';
import { StatCardGroup } from '../../components/StatCardGroup/StatCardGroup';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

export async function getServerSideProps(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const { uid } = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const jobs = [];

    const applicationsSnapshot = await firebaseAdmin
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('applications')
      .get();

    applicationsSnapshot.forEach((job) => {
      jobs.push(job.data());
    });

    const stats = [
      {
        submitted_applications: jobs.length,
      },
      {
        profile_views: 22,
      },
    ];

    return {
      props: {
        data: {
          stats,
        },
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/register',
      },
      props: {},
    };
  }
}

const Dashboard = ({ data }) => {
  const { stats } = data;

  return (
    <div>
      <Nav />
      <Box px={{ base: '16px', md: '40px', lg: '320px' }} mt="20">
        <Breadcrumb />

        <Box as="section" p="10" mt="4" bg="gray.50" rounded="md">
          <StatCardGroup stats={stats} />
          <Box p="8" bg="gray.200" rounded="md" mt="20" h="220px">
            Placeholder box
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export default Dashboard;
