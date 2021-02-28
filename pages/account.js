import nookies from 'nookies';
import { firebaseAdmin } from '../lib/admin';
import { firebaseClient } from '../lib/firebase-client';
import Nav from '../components/Nav';
import NextLink from 'next/link';
import {
  Box,
  Heading,
  Flex,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  BreadcrumbSeparator,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Badge,
} from '@chakra-ui/react';
import { AccountMenu } from '../components/AccountMenu';
import { AccountTab } from '../components/AccountTab';

export async function getServerSideProps(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email, name } = token;

    return {
      props: {
        message: `Welcome ${name}. Your email is ${email} and your UID is ${uid}.`,
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

const tabData = [
  {
    label: 'Account',
    content: 'Perhaps the greatest dish ever invented.',
  },
  {
    label: 'Documents',
    content:
      'Perhaps the surest dish ever invented but fills the stomach more than rice.',
  },
  {
    label: 'Setting',
    content:
      'Perhaps the surest dish ever invented but fills the stomach more than rice.',
  },
];

const account = (props) => {
  const logout = async () => {
    await firebaseClient.auth().signOut();
    window.location.href = '/';
  };
  const { name, email, picture } = props?.token;
  return (
    <>
      <Nav status={props.token} />

      <Box
        px={{ base: '24px', md: '40px', lg: '80px' }}
        bg='gray.100'
        py='12'
        h='620px'
      >
        <Breadcrumb fontSize='sm' fontWeight='medium'>
          <BreadcrumbItem isCurrentPage>
            <NextLink href='/dashboard' passHref>
              <BreadcrumbLink as={Link} _hover={{ textDecoration: 'none' }}>
                Dashboard
              </BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <NextLink href='/account' passHref>
              <BreadcrumbLink as={Link} _hover={{ textDecoration: 'none' }}>
                Account
              </BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* <AccountTab data={tabData} /> */}

        <Flex>
          <Box mt='6' bg='white' w='100%' p='8'>
            <Box mb='4'>
              <Image
                borderRadius='full'
                boxSize='80px'
                src={picture}
                alt={name}
              />
            </Box>

            <Heading
              size='lg'
              letterSpacing='-.8px'
              fontWeight='700'
              lineHeight='1.1'
            >
              {name}
            </Heading>
          </Box>
          <Button onClick={logout} bg='gray.900' color='gray.100'>
            Log out
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default account;
