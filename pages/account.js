import nookies from 'nookies';
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
  Text
} from '@chakra-ui/react';
import { firebaseClient } from '../lib/firebase-client';
import Nav from '../components/Nav';
import { EmailAlert } from '../components/EmailAlert';
import { AccountMenu } from '../components/AccountMenu';
import { AccountTab } from '../components/AccountTab';
import { ChakraContainer } from '../components/atoms/Container';
import { firebaseAdmin } from "../lib/firebase-admin"
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
  const { name, picture, email } = user;
  return (
    <>
      <Nav status={user} />
      {!user.email_verified && <EmailAlert user={user} />}

      <ChakraContainer pt="20">
        <Box h="100vh">
          <Breadcrumb fontSize="sm" fontWeight="medium" mt="6">
            <BreadcrumbItem isCurrentPage>
              <NextLink href="/dashboard" passHref>
                <BreadcrumbLink as={Link} _hover={{ textDecoration: 'none' }}>
                  Dashboard
                </BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <NextLink href="/account" passHref>
                <BreadcrumbLink as={Link} _hover={{ textDecoration: 'none' }}>
                  Account
                </BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Flex>
            <Box mt="8" bg="gray.50" w="100%" p={{base: 4, lg: 8}} h="100%" rounded="lg">
              <Flex direction="row" mb="6">
                <Box>
                  {user.password && <Image
                    borderRadius="full"
                    boxSize="65px"
                    src="https://bit.ly/sage-adebayo"
                    alt={name}
                  />
                  }
                  <Box w="60px" h="60px" bg="gray.300" p="4" position="relative" borderRadius="50%" ><Box bg="brand.900" w="20px" h="20px" borderRadius="50%" position="absolute" bottom="-1" left="0"></Box></Box>
                </Box>

                <Box flex="1" ml="4">
                  <Text
                    // size={!user.name ? "md" : "lg"}
                    letterSpacing="-.8px"
                    fontWeight="700"
                    lineHeight="1.1"
                    my="2"
                    
                  >
                    {name ? name : email}
                  </Text>
                  <Badge colorScheme="green">Applicant</Badge>
                </Box>
              </Flex>


              <Flex mt="14">
                <Button
                  onClick={logout}
                  bg="gray.900"
                  color="gray.100"
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
