import { useForm } from 'react-hook-form';
import {
  Input,
  Button,
  FormControl,
  Box,
  FormErrorMessage,
  FormHelperText,
  Alert,
  InputGroup,
  InputRightElement,
  Flex,
} from '@chakra-ui/react';

export const Newsletter = () => {
  const { handleSubmit, errors, register, formState } = useForm();

  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name} id='email'>
        <Flex py='4' pt='12' direction={{ base: 'column', lg: 'row' }}>
          <Box>
            <Input
              name='email'
              variant='flushed'
              w={{ base: '100%', md: '320px' }}
              type='email'
              placeholder='Email Address'
              ref={register({ required: true })}
            />

            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
            <FormHelperText fontSize='xs' mt='4'>
              New job offers - are the only emails you will recieve!
            </FormHelperText>
          </Box>

          <Button
            w={{ base: '100%', md: 'auto' }}
            type='submit'
            size='md'
            fontSize='sm'
            bg='gray.900'
            color='gray.100'
            _hover={{
              color: 'gray.100',
              bg: 'gray.700',
            }}
            ml={{ base: 0, lg: 4 }}
            mt={{ base: 8, lg: 0 }}
            isLoading={formState.isSubmitting}
          >
            Get notified
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
};
