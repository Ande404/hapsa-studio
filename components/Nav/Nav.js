import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Flex, Heading, Link, Stack } from '@chakra-ui/react';
import { FiFeather, FiShield } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../../context/auth';
import { AccountMenu } from '../AccountMenu';
import { NavButton } from '../NavButton';
import { Button } from '../Button/Button';

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
      data-testid="navbar"
      py="2"
      px={{ base: '16px', md: '40px', lg: '320px' }}
      justify="space-between"
      align="center"
      bg="brand.700"
      color="white"
      position="fixed"
      top="0px"
      zIndex="22"
      left="0px"
      minH="60px"
      right="0px"
    >
      <Box>
        <NextLink href="/">
          <Link _hover={{ textDecor: 'none' }}>
            <FiFeather size="20" />
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
        {!user?.uid ? (
          <Button onClick={() => router.push('/register')}>Sign up</Button>
        ) : (
          <Button
            size="sm"
            bg="brand.900"
            color="gray.100"
            _hover={{
              background: 'gray.400',
            }}
            fontSize="14px"
            rounded="sm"
            onClick={() => router.push('/dashboard')}
          >
            Go to dashboard
          </Button>
        )}
      </Box>
    </Flex>
  );
};
