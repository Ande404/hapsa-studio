import nookies from 'nookies';
import { firebaseAdmin } from '../lib/firebase-admin';
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
  Image,
  Alert,
  AlertIcon,
  Text,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import { AccountMenu } from '../components/AccountMenu';
import { AccountTab } from '../components/AccountTab';
import { ChakraContainer } from '../components/atoms/Container';
export async function getServerSideProps(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      props: {
        user,
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

const account = ({ user }) => {
  const logout = async () => {
    await firebaseClient.auth().signOut();
    window.location.href = '/';
  };
  const { name, picture } = user;
  return (
    <>
      <Nav status={user} />

      <ChakraContainer pt='18'>
        <Box h='100vh'>
          <Box py='6'>
            {!user.email_verified && (
              <Alert status='warning'>
                <AlertIcon />
                Please verify your email address through your
                <Text textDecoration='underline' fontWeight='semibold'>
                  <Link
                    isExternal
                    // feels good to be a gangsta
                    ml='1'
                    href={
                      user.firebase.sign_in_provider === 'google.com'
                        ? 'https://www.google.com/gmail/about/#'
                        : user.firebase.sign_in_provider === 'twitter.com'
                        ? 'https://twitter.com/login'
                        : 'https://fb.com/login'
                    }
                  >
                    provider
                  </Link>
                </Text>
              </Alert>
            )}
          </Box>
          {/* <Breadcrumb fontSize='sm' fontWeight='medium'>
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
          </Breadcrumb> */}
          <Flex>
            <Box mt='8' bg='gray.50' w='100%' p='8' h='100%' rounded='lg'>
              <Box mb='6'>
                <Image
                  borderRadius='full'
                  boxSize='65px'
                  src={picture}
                  alt={name}
                />
              </Box>

              <Heading
                size='lg'
                letterSpacing='-.8px'
                fontWeight='700'
                lineHeight='1.1'
                my='4'
              >
                {name}
              </Heading>

              <Button
                onClick={logout}
                bg='gray.900'
                color='gray.100'
                _hover={{ bg: 'gray.300', color: 'gray.900' }}
              >
                Log out
              </Button>
            </Box>
          </Flex>
          {/* <AccountTab data={tabData} /> */}
        </Box>
      </ChakraContainer>
    </>
  );
};

export default account;
