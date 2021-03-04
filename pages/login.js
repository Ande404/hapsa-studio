import { useState, useEffect } from 'react';
import { firebaseClient } from '../lib/firebase-client';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
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
  FormLabel,
  InputRightElement,
  SimpleGrid,
  InputGroup,
  VisuallyHidden,
  Text,
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

  const handleTwitterLogin = async () => {
    await firebaseClient
      .auth()
      .signInWithRedirect(new firebaseClient.auth.TwitterAuthProvider());
  };

  const handleFacebookLogin = async () => {
    await firebaseClient
      .auth()
      .signInWithRedirect(new firebaseClient.auth.FacebookAuthProvider());
  };

  useEffect(() => {
    if (user) {
      router.push('/job');
    }
  }, [user]);

  return (
    <div>
      <Nav />
      <Center bg='gray.100' py={{ base: 0, md: 6, lg: 8 }} height='100vh'>
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
                rounded='sm'
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
                  rounded='sm'
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
            <Button rounded='sm' type='submit' w='100%' mt='10'>
              Sign up
            </Button>
          </form>
          <Box py='12'>
            <hr style={{ border: '1px solid #edf2f7' }} />
          </Box>
          <Text>Or continue with</Text>
          <SimpleGrid mt='6' columns={3} spacing='3'>
            <Button
              color='currentColor'
              variant='outline'
              onClick={handleFacebookLogin}
              rounded='sm'
            >
              <VisuallyHidden>Login with Facebook</VisuallyHidden>
              <FaFacebook />
            </Button>
            <Button
              color='currentColor'
              variant='outline'
              onClick={handleGoogleLogin}
            >
              <VisuallyHidden>Login with Google</VisuallyHidden>
              <FaGoogle />
            </Button>
            <Button
              color='currentColor'
              variant='outline'
              onClick={handleTwitterLogin}
            >
              <VisuallyHidden>Login with Twitter</VisuallyHidden>
              <FaTwitter />
            </Button>
          </SimpleGrid>
        </Flex>
      </Center>
    </div>
  );
};

export default login;
