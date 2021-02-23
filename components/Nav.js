import { useRouter } from 'next/router';
import { Button, Box, Flex, Spacer, Image, Heading } from '@chakra-ui/react';

import { FiTriangle } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';
import NextLink from 'next/link';
const Nav = (props) => {
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
        {props.status?.uid ? (
          <Flex>
            <NextLink href='/account'>
              <a>
                <Image
                  borderRadius='full'
                  boxSize='30px'
                  src={props.status.picture}
                  alt={props.status.name}
                />
              </a>
            </NextLink>
          </Flex>
        ) : router.pathname !== '/login' ? (
          <div>
            <Button size='sm' bg='none' mr='4' onClick={handleClick}>
              Log in
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
              Sign up
            </Button>
          </div>
        ) : (
          <Button
            bg='brand.600'
            rightIcon={<FaArrowRight />}
            onClick={() => router.push('/dashboard')}
          >
            Dashboard
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Nav;
