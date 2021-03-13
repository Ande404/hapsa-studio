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
          onClick={() => router.push('/register')}
        >
          Login
        </Link>
      </NextLink>
      <Button
        ml="4"
        size="sm"
        color="gray.100"
        bg="brand.900"
        _hover={{
          background: 'rgb(92,52,226, .7)',
        }}
        fontSize="14px"
        rounded="sm"
        onClick={() => router.push('/register')}
      >
        Sign up
      </Button>
    </Flex>
  );
};
