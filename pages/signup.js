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

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().min(8).max(32),
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Signup = () => {
  const [signupStatus, setSignupStatus] = useState({});
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();
  const { user, googleLogin, facebookLogin, twitterLogin, signUp } = useAuth();

  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (userData, e) => {
    try {
      const signupRequest = await signUp(userData.email, userData.password);

      if (signupRequest?.code) {
        switch (signupRequest.code) {
          case 'auth/email-already-in-use':
            setSignupStatus({
              err: true,
              msg: signupRequest.message,
            });
            break;
          case 'auth/invalid-email':
            setSignupStatus({
              err: true,
              msg: signupRequest.message,
            });
            break;
          case 'auth/operation-not-allowed':
            setSignupStatus({
              err: true,
              msg: signupRequest.message,
            });
            break;
          case 'auth/weak-password':
            setSignupStatus({
              err: true,
              msg: signupRequest.message,
            });
            break;
          default:
            break;
        }
        e.target.reset();
      }
      return;
    } catch (error) {
      console.log(error);
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
      <Center pt="12">
        <Flex
          rounded="none"
          w="420px"
          textAlign="left"
          direction="column"
          justify="center"
          px="8"
        >
          <Flex direction="row" align="center" justify="space-between">
            <Heading size="lg" letterSpacing="-.8px" mb="12">
              Sign up
            </Heading>
            <NextLink href="/login">
              <Link
                href="/login"
                ml="6"
                fontWeight="semibold"
                fontSize="md"
                letterSpacing="-.8px"
                color="gray.400"
                mb="12"
              >
                Log in
              </Link>
            </NextLink>
          </Flex>

          {signupStatus.err && <Text my="2">{signupStatus.msg}</Text>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="email" isRequired>
              <FormLabel fontSize="md">Email address</FormLabel>
              <Input
                ref={register({ required: true })}
                fontSize="sm"
                rounded="none"
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
              />
              {errors.email?.message && (
                <Text fontSize="md" pt="4" textAlign="left">
                  {capitalizeFirstLetter(errors.email?.message)}
                </Text>
              )}
            </FormControl>
            <FormControl id="password" isRequired mt="6">
              <FormLabel fontSize="md">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  ref={register({ required: true })}
                  fontSize="md"
                  rounded="none"
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
                <Text fontSize="md" pt="4" textAlign="left">
                  {capitalizeFirstLetter(errors.password?.message)}
                </Text>
              )}
            </FormControl>

            <Button
              rounded="none"
              type="submit"
              w="100%"
              mt="10"
              bg="brand.900"
              _hover={{
                bg: 'rgb(90,42,200)',
              }}
              color="white"
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
              <NextLink href="/signup">
                <Link>
                  <Text size="md" letterSpacing="-.4px" mt="2">
                    Trouble signing in?
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
