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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  TableCaption,
} from '@chakra-ui/react';
import { EmailAlert } from '../components/EmailAlert';
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
      {!user.email_verified && <EmailAlert user={user} />}

      <ChakraContainer pt='20'>
        <Box h='100vh'>
          <Breadcrumb fontSize='sm' fontWeight='medium' mt='6'>
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

          <Flex>
            <Box mt='8' bg='gray.50' w='100%' p='8' h='100%' rounded='lg'>
              <Flex direction='row' mb='6'>
                <Box>
                  <Image
                    borderRadius='full'
                    boxSize='65px'
                    src={picture}
                    alt={name}
                  />
                </Box>

                <Box flex='1' ml='4'>
                  <Heading
                    size='lg'
                    letterSpacing='-.8px'
                    fontWeight='700'
                    lineHeight='1.1'
                    my='2'
                  >
                    {name}
                  </Heading>
                  <Badge colorScheme='green'>Applicant</Badge>
                </Box>
              </Flex>

              <Table
                variant='simple'
                mt='12'
                variant='striped'
                colorScheme='gray.50'
              >
                <TableCaption>
                  Please check your email after each decision to confirm
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Offer</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                </Tbody>
                {/* <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot> */}
              </Table>

              <Flex mt='14'>
                <Button
                  onClick={logout}
                  bg='gray.900'
                  color='gray.100'
                  _hover={{ bg: 'gray.700' }}
                >
                  Log out
                </Button>
              </Flex>
            </Box>
          </Flex>
          {/* <AccountTab data={tabData} /> */}
        </Box>
      </ChakraContainer>
    </>
  );
};

export default account;
