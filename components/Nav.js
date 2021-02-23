import { useRouter } from 'next/router';
import { Button, Box, Flex, Spacer, Image, Heading } from '@chakra-ui/react';

import { FiTriangle } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';
import NextLink from 'next/link';
import { useAuth } from '../context/auth';
const Nav = () => {
  const { user } = useAuth();

  if (user) {
    console.log(user);
  }
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/login');
  };
  return (
    <Flex
      py='4'
      px={{ base: '24px', md: '40px', lg: '340px' }}
      justify='space-between'
      align='center'
    >
      <Box p='2'>
        <Heading size='md' color='white'>
          <NextLink href='/'>
            <a>
              <FiTriangle stroke='black' />
            </a>
          </NextLink>
        </Heading>
      </Box>
      <Spacer />
      <Box>
        {user.uid ? (
          <Box>
            <NextLink href='/account'>
              <a>
                <Image
                  borderRadius='full'
                  boxSize='30px'
                  src={user.photoUrl}
                  alt={user.name}
                />
              </a>
            </NextLink>
          </Box>
        ) : (
          <div>
            <Button size='sm' bg='none' mr='4' onClick={handleClick}>
              Sign up
            </Button>
            <Button
              size='sm'
              bg='gray.700'
              color='gray.100'
              _hover={{
                color: 'gray.100',
                bg: 'gray.900',
              }}
              onClick={handleClick}
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
