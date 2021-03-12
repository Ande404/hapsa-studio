import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
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
  Stack,
} from '@chakra-ui/react';
import * as yup from 'yup';
import NextLink from 'next/link';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../context/auth';

// const schema = yup.object().shape({
//   email: yup.string().required().email(),
//   password: yup.string().min(8).max(32),
// });

const initialValues = {
  email: '',
  password: '',
};

const Register = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    initialValues,
    onSubmit: (values) => registerUser(values),
  });

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();
  const {
    user,
    googleLogin,
    facebookLogin,
    twitterLogin,
    signIn,
    signUp,
  } = useAuth();

  const registerUser = async ({ values }) => {
    if (values) {
      const { email, password } = values;
      console.log(email, password);
      const signupRequest = await signUp(email, password);

      console.log(signupRequest);
    }
  };

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
              Get started
            </Heading>
            <NextLink href="/" passHref>
              <Link
                ml="6"
                fontWeight="semibold"
                fontSize="md"
                letterSpacing="-.8px"
                color="gray.400"
                mb="12"
              >
                Home
              </Link>
            </NextLink>
          </Flex>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
              <FormLabel fontSize="md">Email address</FormLabel>
              <Input
                value={values.email}
                onChange={handleChange}
                fontSize="sm"
                rounded="sm"
                type="email"
                name="email"
                placeholder="Email Address"
              />
            </FormControl>
            <FormControl id="password" isRequired mt="6">
              <FormLabel fontSize="md">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  onChange={handleChange}
                  value={values.password}
                  fontSize="md"
                  rounded="sm"
                  pr="4.5rem"
                  minLength="8"
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
            </FormControl>
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
            >
              Continue
            </Button>
            <Stack mt="8" fontWeight="semibold" size="sm" letterSpacing="-.4px">
              <NextLink href="/signup" passHref>
                <Link size="sm" letterSpacing="-.2px">
                  Don't have an account? Sign up
                </Link>
              </NextLink>
              <NextLink href="/signup" passHref>
                <Link size="sm" letterSpacing="-.2px" mt="2">
                  Trouble signing in?
                </Link>
              </NextLink>
            </Stack>
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
              rounded="sm"
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

export default Register;
