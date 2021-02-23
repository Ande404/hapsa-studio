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
  Center,
  Input,
  FormControl,
  Box,
  Link,
  Spinner,
  FormLabel,
  InputRightElement,
  SimpleGrid,
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
      <Flex
        textAlign='center'
        px={{ base: '24px', md: '40px', lg: '560px' }}
        py='12'
        direction='column'
        justify='center'
      >
        <Heading size='md' py='6'>
          Sign up
        </Heading>
        <form>
          <FormControl id='email' isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              id='email'
              type='email'
              name='Email'
              placeholder='Email Address'
            />
          </FormControl>
          <FormControl mt='6' id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <Input
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
          </FormControl>

          <Box textAlign='left' mt='3'>
            <Link size='xs' color='gray.500'>
              Trouble signing in?
            </Link>
          </Box>
          <Button type='submit' w='100%' mt='10'>
            Sign up
          </Button>
        </form>
        <Box py='12'>
          <hr style={{ border: '1px solid #edf2f7' }} />
        </Box>

        {/* <Divider orientation='horizontal' my='6' /> */}
        {!user ? (
          <SimpleGrid>
            <Button
              leftIcon={<FcGoogle />}
              bg='white'
              _hover={{ backgroundColor: 'gray.50' }}
              boxShadow='xs'
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>
            <Button
              color='white'
              mt='6'
              leftIcon={<FaGithub />}
              bg='gray.800'
              _hover={{ backgroundColor: 'black' }}
              boxShadow='xs'
              onClick={handleGithubLogin}
            >
              Continue with Github
            </Button>
          </SimpleGrid>
        ) : (
          <Center>
            <Spinner />
          </Center>
        )}
      </Flex>
    </div>
  );
};

export default login;
