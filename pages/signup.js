import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Heading,
  Button,
  Flex,
  Input,
  FormControl,
  Box,
  Link,
  Center,
  FormLabel,
  InputRightElement,
  SimpleGrid,
  InputGroup,
  VisuallyHidden,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '../context/auth';
import { formatUser } from '../lib/firebase-helpers';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().min(8).max(32),
});

const Signup = () => {
  const [userExists, setUserExists] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();
  const { user, googleLogin, facebookLogin, twitterLogin, signUp } = useAuth();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (userData) => {
    if (userExists) {
      setUserExists(true);
      console.warn('email already exists');
      return;
    }
    const createdUser = await signUp(userData.email, userData.password);

    if (createdUser.code === 'auth/email-already-in-use') {
      console.log('email already exists');
      setUserExists(true);
    } else {
      console.log(formatUser(createdUser));
    }
  };

  useEffect(() => {
    if (user) {
      router.push('/job');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box h="100vh" bg="gray.50">
      <Center pt="20">
        <Flex
          rounded="sm"
          w="420px"
          textAlign="center"
          direction="column"
          justify="center"
          px="8"
        >
          <Heading size="lg" letterSpacing="-.8px" mb="12">
            Sign up
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            {userExists && (
              <Text color="red.600" pb="4" fontWeight="bold">
                This email is already registered
              </Text>
            )}

            <FormControl id="email" isRequired>
              <FormLabel fontSize="md">Email address</FormLabel>
              <Input
                ref={register({ required: true })}
                fontSize="sm"
                rounded="sm"
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
              />
              <p>{errors.email?.message}</p>
            </FormControl>
            <FormControl id="password" isRequired mt="4">
              <FormLabel fontSize="md">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  ref={register({ required: true })}
                  fontSize="md"
                  rounded="sm"
                  pr="4.5rem"
                  name="password"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password?.message && (
                <Text fontSize="sm" py="2" textAlign="left" colorScheme="red">
                  {errors.password?.message}
                </Text>
              )}
            </FormControl>

            <Box textAlign="left" mt="2">
              <Link fontSize="sm" color="gray.500">
                Trouble signing in?
              </Link>
            </Box>
            <Button
              rounded="sm"
              type="submit"
              w="100%"
              mt="10"
              bg="brand.900"
              _hover={{
                bg: 'rgb(90,42,200)',
              }}
              color="white"
              isDisabled={userExists}
            >
              Sign up
            </Button>
            <Box mt="8">
              <NextLink href="/login">
                <Link>
                  <Text size="sm" letterSpacing="-.4px">
                    Already have an account? Log in
                  </Text>
                </Link>
              </NextLink>
            </Box>
          </form>
          <Box py="12">
            <hr style={{ border: '1px solid #edf2f7' }} />
          </Box>
          <Text size="sm" letterSpacing="-.4px" fontWeight="semibold">
            Or continue with
          </Text>
          <SimpleGrid mt="6" columns="3" spacing="3">
            <Button
              color="currentColor"
              variant="outline"
              onClick={facebookLogin}
              rounded="md"
            >
              <VisuallyHidden>Login with Facebook</VisuallyHidden>
              <FaFacebook />
            </Button>
            <Button
              color="currentColor"
              variant="outline"
              onClick={googleLogin}
            >
              <VisuallyHidden>Login with Google</VisuallyHidden>
              <FaGoogle />
            </Button>
            <Button
              color="currentColor"
              variant="outline"
              onClick={twitterLogin}
            >
              <VisuallyHidden>Login with Twitter</VisuallyHidden>
              <FaTwitter />
            </Button>
          </SimpleGrid>
        </Flex>
      </Center>
    </Box>
  );
};

export default Signup;
