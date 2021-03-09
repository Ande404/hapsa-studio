import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import {
  Input,
  Button,
  FormControl,
  Box,
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

    if (error === 'Email address already registered') {
      console.log('Email address already exists');
    }

    if (error === 'Invaild email address') {
      console.log('Invalid email request');
    }

    if (status === 201) {
      e.target.reset();
      console.log('user registered');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name} id="email">
        <Flex py="4" pt="12" direction={{ base: 'column', lg: 'row' }}>
          <Box>
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
            <FormHelperText fontSize="xs" mt="4">
              New job offers - are the only emails you will recieve!
            </FormHelperText>
          </Box>

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
            ml={{ base: 0, lg: 4 }}
            mt={{ base: 8, lg: 0 }}
          >
            Get notified
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
};
