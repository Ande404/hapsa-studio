import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Button, Box, Flex, Heading, Link, Stack } from '@chakra-ui/react';
import { useAuth } from '../context/auth';
import { AccountMenu } from './AccountMenu';

const navLink = [
  {
    page: '/job',
    title: 'Jobs',
  },
  {
    page: '/recruiter',
    title: 'Recruiter',
  },
  {
    page: '/why',
    title: 'Why Hapsa?',
  },
];

const Nav = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <Flex
      py="2"
      px={{ base: '16px', md: '40px', lg: '160px' }}
      justify="space-between"
      align="center"
      bg="gray.900"
      color="white"
      borderBottom="1px solid rgba(216,236,241, .1)"
      position="fixed"
      top="0px"
      zIndex="90000"
      left="0px"
      right="0px"
    >
      <Box>
        <NextLink href="/">
          <Link _hover={{ textDecor: 'none' }}>
            <Heading size="sm" fontWeight="bold" letterSpacing="-1px">
              Hapsa
            </Heading>
          </Link>
        </NextLink>
      </Box>

      <Stack
        direction={{ base: 'column', lg: 'row' }}
        display={{ base: 'none', lg: 'inherit' }}
        spacing="6"
      >
        {navLink.map(({ page, title }) => (
          <div key={page}>
            <NextLink href={page}>
              <Link fontWeight="semibold" letterSpacing="-.5px" fontSize="sm">
                {title}
              </Link>
            </NextLink>
          </div>
        ))}
      </Stack>
      <Box display={{ base: 'inherit', lg: 'inherit' }}>
        {user?.uid && router.pathname !== '/' ? (
          <Box>
            <AccountMenu user={user} signOut={signOut} />
          </Box>
        ) : (
          <Flex direction="row" justify="center" align="center">
            <NextLink href="/login" passHref>
              <Link
                fontWeight="semibold"
                letterSpacing="-.5px"
                fontSize="sm"
                color="white"
                _hover={{
                  bg: 'none',
                  color: 'white',
                  textDecoration: 'underline',
                }}
                rounded="sm"
                onClick={() => router.push('/login')}
              >
                Login
              </Link>
            </NextLink>
            <Button
              ml="4"
              size="sm"
              px="2"
              bg="rgb(92,52,226)"
              color="gray.100"
              _hover={{
                bg: 'rgb(90,42,200)',
              }}
              fontSize="14px"
              rounded="sm"
              onClick={() => router.push('/signup')}
            >
              Sign up
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Nav;
