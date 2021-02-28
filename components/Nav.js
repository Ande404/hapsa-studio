import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useAuth } from '../context/auth';
import { FiTriangle } from 'react-icons/fi';
import {
  Button,
  Box,
  Flex,
  Spacer,
  Image,
  Heading,
  Link,
} from '@chakra-ui/react';
const Nav = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Flex
      py='4'
      px={{ base: '16px', md: '40px', lg: '80px' }}
      justify='space-between'
      align='center'
      bg='rgb(15,29,123)'
      color='white'
      borderBottom='1px solid rgba(216,236,241, .1)'
    >
      <Box p='2'>
        <NextLink href='/'>
          <Link>
            <Heading size='md' fontWeight='bold' letterSpacing='-1px'>
              Hapsa
            </Heading>
          </Link>
        </NextLink>
      </Box>

      <Box display={{ base: 'none', lg: 'inherit' }}>
        <NextLink href='/job'>
          <Link fontWeight='semibold' letterSpacing='-.5px'>
            Jobs
          </Link>
        </NextLink>
        <NextLink href='/job'>
          <Link fontWeight='semibold' ml='6' letterSpacing='-.5px'>
            Recruiters
          </Link>
        </NextLink>
        <NextLink href='/job'>
          <Link fontWeight='semibold' ml='6' letterSpacing='-.5px'>
            Career Advice
          </Link>
        </NextLink>
        <NextLink href='/job'>
          <Link fontWeight='semibold' ml='6' letterSpacing='-.5px'>
            About
          </Link>
        </NextLink>
      </Box>
      <Box display={{ base: 'none', lg: 'inherit' }}>
        {user?.uid && router.pathname !== '/' ? (
          <Box>
            <NextLink href='/account'>
              <a>
                <Image
                  borderRadius='full'
                  boxSize='35px'
                  src={user.photoUrl}
                  alt={user.name}
                />
              </a>
            </NextLink>
          </Box>
        ) : (
          <div>
            <Button
              size='md'
              _hover={{
                bg: 'none',
              }}
              bg='none'
              mr='4'
              onClick={() => router.push('login')}
            >
              Sign up
            </Button>
            <Button
              size='md'
              rounded='none'
              color='gray.900'
              bg='gray.200'
              color='gray.900'
              _hover={{
                color: 'gray.100',
                bg: 'gray.400',
              }}
              onClick={() => router.push('dashboard')}
            >
              Dashboard
            </Button>
          </div>
        )}
      </Box>
    </Flex>
  );
};

export default Nav;
