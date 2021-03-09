import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Button, Flex, Link } from '@chakra-ui/react';

export const NavButton = () => {
  const router = useRouter();
  return (
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
  );
};
