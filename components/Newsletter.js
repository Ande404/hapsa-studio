import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import {
  Input,
  Button,
  FormControl,
  Box,
  Heading,
  FormErrorMessage,
  FormHelperText,
  Alert,
  InputGroup,
  Text,
  Flex,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().required().email(),
});

export const Newsletter = () => {
  const {
    handleSubmit,
    errors,
    register,
    formState,
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, e) => {
    const fromMailchimp = await fetch('/api/newsletter', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const { status } = fromMailchimp;
    const { error } = await fromMailchimp.json();

    console.warn(status, error);

    if (status === 201) {
      e.target.reset();
      console.log('user registered');
    }

    switch (error) {
      case 'Email address already registered':
        console.log('Email address already registered');
        break;
      case 'Invaild email address':
        console.log('Email address already registered');
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name} id="email">
        <Flex
          bg="brand.600"
          direction={{ base: 'column', lg: 'row' }}
          my="14"
          p="8"
        >
          <Box w={{ base: '100%', lg: '50%' }}>
            <Heading letterSpacing="-.6px" size="lg">
              Come thru &amp; meet the woo
            </Heading>
          </Box>

          <Box mt={{ base: 4, lg: 0 }}>
            <Input
              name="email"
              w={{ base: '100%', md: '320px' }}
              type="email"
              p="4"
              rounded="md"
              bg="gray.50"
              placeholder="Email Address"
              ref={register({ required: true })}
            />

            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>

            <Button
              w={{ base: '100%', md: 'auto' }}
              type="submit"
              size="md"
              fontSize="sm"
              bg="gray.900"
              color="gray.100"
              _hover={{
                color: 'gray.100',
                bg: 'gray.700',
              }}
              mt="2"
            >
              Get notified
            </Button>
          </Box>
        </Flex>
      </FormControl>
    </form>
  );
};
