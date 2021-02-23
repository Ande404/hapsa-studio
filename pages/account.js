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
  BreadcrumbSeparator,
} from '@chakra-ui/react';
import { AccountMenu } from '../components/AccountMenu';
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
const account = (props) => {
  const logout = async () => {
    await firebaseClient.auth().signOut();
    window.location.href = '/';
  };
  const { name, email, picture } = props?.token;
  return (
    <>
      <Nav status={props.token} />

      <Box px={{ base: '24px', md: '40px', lg: '340px' }}>
        <Breadcrumb fontWeight='medium' fontSize='sm' mb='12'>
          <BreadcrumbItem isCurrentPage>
            <NextLink href='/' passHref>
              <BreadcrumbLink as={Link} _hover={{ textDecoration: 'none' }}>
                Dashboard
              </BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <NextLink href='/' passHref>
              <BreadcrumbLink as={Link} _hover={{ textDecoration: 'none' }}>
                Account
              </BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex>
          <Box mt='2'>
            <Heading
              size='lg'
              letterSpacing='-.8px'
              fontWeight='700'
              lineHeight='1.1'
            >
              {name}
            </Heading>
          </Box>

          <AccountMenu logout={logout} />
        </Flex>
      </Box>
    </>
  );
};

export default account;
