import { useState, useEffect } from 'react';
import { firebaseClient } from '../lib/firebase-client';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Nav from '../components/Nav';

import {
  Heading,
  Button,
  Flex,
  Input,
  FormControl,
  Box,
  Link,
  Grid,
  GridItem,
  Center,
  Spinner,
  FormLabel,
  InputRightElement,
  SimpleGrid,
  InputGroup,
  Image,
} from '@chakra-ui/react';

const login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { user } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    await firebaseClient
      .auth()
      .signInWithPopup(new firebaseClient.auth.GoogleAuthProvider());
  };

  const handleGithubLogin = async () => {
    await firebaseClient
      .auth()
      .signInWithRedirect(new firebaseClient.auth.GithubAuthProvider());
  };

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
    return () => {};
  }, [user]);

  return (
    <div>
      <Nav />
      <Center bg='gray.100' py={{ base: 0, md: 6, lg: 8 }}>
        <Flex
          w={{ base: '100%', lg: '420px' }}
          bg='white'
          textAlign='center'
          p='8'
          direction='column'
          justify='center'
          maxWidth='420px'
          margin='0 auto'
        >
          <Heading size='lg' letterSpacing='-.8px' py='8'>
            Sign up
          </Heading>
          <form>
            <FormControl id='email' isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                rounded='none'
                id='email'
                type='email'
                name='Email'
                placeholder='Email Address'
              />
            </FormControl>
            <FormControl mt='6' id='password' isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size='md'>
                <Input
                  rounded='none'
                  pr='4.5rem'
                  name='password'
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Box textAlign='left' mt='3'>
              <Link size='xs' color='gray.500'>
                Trouble signing in?
              </Link>
            </Box>
            <Button rounded='none' type='submit' w='100%' mt='10'>
              Sign up
            </Button>
          </form>
          <Box py='12'>
            <hr style={{ border: '1px solid #edf2f7' }} />
          </Box>

          {!user ? (
            <SimpleGrid>
              <Button
                rounded='none'
                leftIcon={<FcGoogle />}
                bg='white'
                _hover={{ backgroundColor: 'gray.50' }}
                boxShadow='xs'
                onClick={handleGoogleLogin}
              >
                Login with Google
              </Button>
              <Button
                rounded='none'
                color='white'
                mt='6'
                leftIcon={<FaGithub />}
                bg='gray.800'
                _hover={{ backgroundColor: 'black' }}
                boxShadow='xs'
                onClick={handleGithubLogin}
              >
                Login with Github
              </Button>
            </SimpleGrid>
          ) : (
            <Center>
              <Spinner />
            </Center>
          )}
        </Flex>
      </Center>
    </div>
  );
};

export default login;
