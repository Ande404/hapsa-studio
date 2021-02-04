import { useState, useEffect } from 'react';
import { firebaseClient } from '../lib/firebase-client';
import NextLink from 'next/link';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router';
import Nav from '../components/Nav';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import {
  Heading,
  Button,
  Flex,
  Divider,
  Text,
  Input,
  FormControl,
  Box,
  Link,
  FormLabel,
  InputGroup,
  InputRightElement,
  Spinner,
  background,
} from '@chakra-ui/react';

const login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { user } = useAuth();
  const router = useRouter();

  const handeLogin = async () => {
    await firebaseClient
      .auth()
      .signInWithPopup(new firebaseClient.auth.GoogleAuthProvider());
  };

  const customLogin = async () => {
    event.preventDefault();
    console.log('clicked me');
    // await firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     console.log(userCredential);
    //   });
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
        my='12'
        direction='column'
        justify='center'
      >
        <Heading size='md' textTransform='uppercase'>
          Sign up
        </Heading>
        {/* <form>
          <FormControl id='email' isRequired my='8'>
            <FormLabel>Email address</FormLabel>
            <Input placeholder='John@doe.com' />
            <Box mt='6'>
              <FormLabel>Password</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Box textAlign='left' mt='3'>
                <Link size='xs' color='gray.500'>
                  <NextLink href='/'>
                    <a>Trouble signing in?</a>
                  </NextLink>
                </Link>
              </Box>
              <Button w='100%' onClick={() => customLogin()} mt='6'>
                Sign up
              </Button>
            </Box>
          </FormControl>
        </form> */}

        <Divider orientation='horizontal' my='6' />
        {!user ? (
          <div>
            <Button
              leftIcon={<FcGoogle />}
              bg='white'
              _hover={{ backgroundColor: 'gray.50' }}
              boxShadow='xs'
              onClick={handeLogin}
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
              onClick={handeLogin}
            >
              Continue with Github
            </Button>
          </div>
        ) : (
          <Button onClick={() => router.push('/dashboard')}>
            Continue to dashboard
          </Button>
        )}
      </Flex>
    </div>
  );
};

export default login;
