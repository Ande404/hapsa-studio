import nookies from 'nookies';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Image,
  Badge,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { firebaseClient } from '../firebase/client';
import { Nav } from '../components/Nav/Nav';
import { EmailAlert } from '../components/EmailAlert';
import { firebaseAdmin } from '../firebase/admin';

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
        destination: '/register',
      },
      props: {},
    };
  }
}

const Account = ({ user }) => {
  const logout = async () => {
    await firebaseClient.auth().signOut();
    window.location.href = '/';
  };

  const { name, picture, email } = user;

  return (
    <>
      <Nav status={user} />
      {!user.email_verified && <EmailAlert user={user} mt="20" />}

      <Box px={{ base: '16px', md: '40px', lg: '160px' }}>
        <Box h="100vh">
          <Breadcrumb fontSize="sm" fontWeight="medium" mt="10">
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
            <Box
              mt="4"
              bg="gray.50"
              w="100%"
              p={{ base: 4, lg: 8 }}
              h="100%"
              rounded="lg"
            >
              <Flex direction="row" mb="6">
                <Box>
                  {user.picture ? (
                    <Image
                      borderRadius="full"
                      boxSize="60px"
                      src={picture}
                      alt={name}
                    />
                  ) : (
                    <Box
                      w="60px"
                      h="60px"
                      bg="linear-gradient(144deg, rgba(25,35,52,1) 0%, rgba(56,62,70,1) 100%)"
                      p="4"
                      position="relative"
                      borderRadius="50%"
                    >
                      <Box
                        bg="brand.900"
                        w="20px"
                        h="20px"
                        borderRadius="50%"
                        position="absolute"
                        bottom="-1"
                        left="0"
                      />
                    </Box>
                  )}
                </Box>

                <Box flex="1" ml="4">
                  <Text
                    fontSize={{ base: 'md', md: '2xl' }}
                    letterSpacing="-.4px"
                    fontWeight="700"
                    lineHeight="1.1"
                    my="2"
                  >
                    {name || email.split('@')[0]}
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
        </Box>
      </Box>
    </>
  );
};

Account.propTypes = {
  user: PropTypes.object,
};

export default Account;
