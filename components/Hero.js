import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { Container } from './atoms/Container';
import { Box, Heading, Text, Flex, Divider, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import TextLoop from 'react-text-loop';
import { useRouter } from 'next/router';

export const Hero = () => {
  const router = useRouter();

  return (
    <Flex
      px={{ base: '16px', md: '40px', lg: '80px' }}
      rounded='none'
      py='12'
      bg='rgb(15,29,123)'
      justify='space-between'
      direction={{ base: 'column', lg: 'row' }}
      position='relative'
      minHeight='280px'
    >
      <Flex direction='column' w={{ base: '100%', lg: '720px' }}>
        <Heading
          color='rgb(216,236,241)'
          size='2xl'
          letterSpacing='-2px'
          fontWeight='semibold'
          lineHeight='1.1'
        >
          Tired of painful job applications? We will deliever an offer to you
        </Heading>
        <Text
          color='rgb(216,236,241)'
          py='8'
          fontSize='lg'
          letterSpacing='-.2px'
          fontWeight='500'
          lineHeight='1.5'
          fontSize='md'
        >
          Hapsa simplies the job hunting process. Tell us your preference and we
          will match you with the right recruiters to start your next job.
        </Text>
        <Button
          w='auto'
          size='md'
          rounded='none'
          color='gray.900'
          bg='gray.200'
          color='gray.900'
          _hover={{
            color: 'gray.100',
            bg: 'gray.400',
          }}
          onClick={() => router.push('/job')}
        >
          View all jobs
        </Button>
      </Flex>

      <Box
        transform='translateY(45%)'
        position='sticky'
        right={{ base: '16px', md: '40px', lg: '80px' }}
        boxShadow='sm'
        bg='gray.500'
        // bg='rgb(216,236,241)'
        p={{ base: 4, lg: 8 }}
        w={{ base: '100%', md: '420px' }}
        color='rgb(216,236,241)'
      >
        <TextLoop interval='5500'>
          <Text fontWeight='semibold' letterSpacing='-.4px'>
            Software Engineer
          </Text>
          <Text fontWeight='semibold' letterSpacing='-.4px'>
            Marketing Summer Internship
          </Text>
        </TextLoop>
        <Divider py={{ base: 1, lg: 2 }} />
        <Box pt='4'>more text here</Box>
        <Box pt='4'>more text here</Box>
        <Box pt='4'>more text here</Box>
        <Box pt='4'>more text here</Box>
        <Box pt='4'>more text here</Box>
      </Box>
    </Flex>
  );
};
