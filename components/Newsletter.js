import { useForm } from 'react-hook-form';

import {
  Input,
  Button,
  FormControl,
  Box,
  FormErrorMessage,
  FormHelperText,
  Alert,
} from '@chakra-ui/react';

export const Newsletter = () => {
  const { handleSubmit, errors, register, formState } = useForm();

  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box py='4' pt='12'>
        <FormControl isInvalid={errors.name} id='email'>
          <Input
            name='email'
            w={{ base: '100%', md: '65%' }}
            type='email'
            placeholder='Email Address'
            ref={register({ required: true })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
          <FormHelperText>
            New job offers - are the only emails you will recieve!
          </FormHelperText>

          <Button
            w={{ base: '100%', md: 'auto' }}
            type='submit'
            size='md'
            bg='gray.700'
            color='gray.100'
            _hover={{
              color: 'gray.100',
              bg: 'gray.900',
            }}
            mt='6'
            isLoading={formState.isSubmitting}
          >
            Get notified
          </Button>
        </FormControl>
      </Box>
    </form>
  );
};
