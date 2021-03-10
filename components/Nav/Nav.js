import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Flex, Heading, Link, Stack } from '@chakra-ui/react';
import { useAuth } from '../../context/auth';
import { AccountMenu } from '../AccountMenu';
import { NavButton } from '../NavButton';

const navLink = [
  {
    page: '/',
    title: 'index',
    show: false,
  },
  {
    page: '/job',
    title: 'Jobs',
    show: true,
  },
  {
    page: '/recruiter',
    title: 'Recruiter',
    show: true,
  },
  {
    page: '/why',
    title: 'Why Hapsa?',
    show: true,
  },
];

export const Nav = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const isOnPage = navLink
    .map((navItem) => navItem.page)
    .includes(router.pathname);

  return (
    <Flex
      py="2"
      px={{ base: '16px', md: '40px', lg: '160px' }}
      justify="space-between"
      align="center"
      bg="gray.900"
      color="white"
      position="fixed"
      top="0px"
      zIndex="22"
      left="0px"
      right="0px"
    >
      <Box as="nav">
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
        {navLink.map(({ page, title, show }) => (
          <div key={page}>
            {show && (
              <NextLink href={page}>
                <Link fontWeight="semibold" letterSpacing="-.5px" fontSize="sm">
                  {title}
                </Link>
              </NextLink>
            )}
          </div>
        ))}
      </Stack>
      <Box display={{ base: 'inherit', lg: 'inherit' }}>
        {user?.uid && !isOnPage ? (
          <Box>
            <AccountMenu user={user} signOut={signOut} />
          </Box>
        ) : (
          <NavButton />
        )}
      </Box>
    </Flex>
  );
};
