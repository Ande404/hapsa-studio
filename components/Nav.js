import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useAuth } from '../context/auth';
import { Button, Box, Flex, Image, Heading, Link } from '@chakra-ui/react';

const Nav = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Flex
      py='2'
      px={{ base: '16px', md: '40px', lg: '160px' }}
      justify='space-between'
      align='center'
      bg='gray.900'
      color='white'
      borderBottom='1px solid rgba(216,236,241, .1)'
      position='fixed'
      top='0px'
      zIndex='90000'
      left='0px'
      right='0px'
    >
      <Box>
        <NextLink href='/'>
          <Link _hover={{ textDecor: 'none' }}>
            <Heading size='sm' fontWeight='bold' letterSpacing='-1px'>
              Hapsa
            </Heading>
          </Link>
        </NextLink>
      </Box>

      <Box display={{ base: 'none', lg: 'inherit' }}>
        <NextLink href='/job'>
          <Link fontWeight='semibold' letterSpacing='-.5px' fontSize='sm'>
            Jobs
          </Link>
        </NextLink>
        <NextLink href='/job'>
          <Link
            fontWeight='semibold'
            ml='6'
            letterSpacing='-.5px'
            fontSize='sm'
          >
            Recruiters
          </Link>
        </NextLink>
        <NextLink href='/job'>
          <Link
            fontWeight='semibold'
            ml='6'
            letterSpacing='-.5px'
            fontSize='sm'
          >
            Career Advice
          </Link>
        </NextLink>
        <NextLink href='/job'>
          <Link
            fontWeight='semibold'
            ml='6'
            letterSpacing='-.5px'
            fontSize='sm'
          >
            About
          </Link>
        </NextLink>
      </Box>
      <Box display={{ base: 'inherit', lg: 'inherit' }}>
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
              size='sm'
              _hover={{
                bg: 'none',
                color: 'gray.300',
              }}
              bg='none'
              rounded='none'
              mr='4'
              onClick={() => router.push('login')}
            >
              Sign up
            </Button>
            <Button
              size='sm'
              color='gray.900'
              bg='gray.200'
              color='gray.900'
              _hover={{
                bg: 'gray.300',
              }}
              rounded='sm'
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
