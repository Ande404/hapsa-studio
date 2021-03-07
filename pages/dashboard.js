import nookies from 'nookies';
import {
  Box,
  SimpleGrid,
  useColorModeValue as mode,
  Stat,
  StatLabel,
  StatNumber,
  Heading,
} from '@chakra-ui/react';
import { firebaseAdmin } from '../lib/firebase-admin';
import { firebaseClient } from '../lib/firebase-client';
import Nav from '../components/Nav';
import Form from '../components/Form';
import { StatCard } from '../components/StatCard';

const data = [
  { label: 'Submitted Applications', value: '19' },
  { label: 'Response Rate', value: '56.87%' },
  { label: 'Profile Views', value: '2,152' },
];

export async function getServerSideProps(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      props: {
        token,
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };
  }
}
const dashboard = ({ token }) => {
  const logout = async () => {
    await firebaseClient.auth().signOut();
    window.location.href = '/';
  };

  return (
    <>
      <Nav status={token} logout={logout} />
      <Box px={{ base: '16px', md: '40px', lg: '160px' }} mt="20">
        <Heading size="md">Dashboard</Heading>

        <SimpleGrid
          as="section"
          p="10"
          mt="4"
          columns={{ base: 1, md: 3 }}
          spacing="6"
          maxW="7xl"
          bg="gray.50"
          px={{ base: '6', md: '8' }}
        >
          {data.map((stat, idx) => (
            <StatCard key={idx} data={stat} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default dashboard;
