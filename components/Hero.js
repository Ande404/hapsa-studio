import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { Container } from './atoms/Container';
import {
  Box,
  Heading,
  Text,
  Flex,
  Link,
  Image,
  Center,
  Button,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import TextLoop from 'react-text-loop';
import { useRouter } from 'next/router';
import { HeroJobCard } from './HeroJobCard';
import { ArrowForwardIcon } from '@chakra-ui/icons';

export const Hero = ({ jobs }) => {
  const router = useRouter();

  return (
    <Flex
      mx={{ base: '16px', md: '40px', lg: '160px' }}
      rounded='sm'
      bg='gray.100'
      mt='24'
      p='12'
      justify='space-between'
      direction={{ base: 'column', lg: 'row' }}
      position='relative'
      rounded='lg'
    >
      <Box>
        <Flex direction='column' w={{ base: '100%', lg: '620px' }}>
          <NextLink href='/career-advice'>
            <Heading
              as={Link}
              size='md'
              letterSpacing='-.8px'
              fontWeight='semibold'
              mb='4'
            >
              Understand the basics of design and studying{' '}
              <ArrowForwardIcon ml='2' />
            </Heading>
          </NextLink>
          <hr
            style={{
              borderTop: '2px solid black',
              marginBottom: '2rem',
            }}
          />

          <Heading
            mt='12'
            size='2xl'
            letterSpacing='-2px'
            fontWeight='bolder'
            lineHeight='1.1'
            color='gray.900'
          >
            Tired of painful job applications? We connect you with{' '}
            <TextLoop>
              <Text color='blue.600'>ventures</Text>
              <Text color='blue.600'>recruiters</Text>
            </TextLoop>
          </Heading>
          {/* <Text
            py='8'
            fontSize='lg'
            letterSpacing='-.2px'
            fontWeight='500'
            lineHeight='1.5'
            fontSize='md'
          >
            Hapsa simplies the job hunting process. Tell us your preference and
            we will match you with the right recruiters to start your next job.
          </Text> */}

          <Button
            mt='12'
            size='md'
            bg='linear-gradient(202deg, rgba(2,0,36,1) 0%, rgba(19,19,71,1) 60%, rgba(0,0,0,1) 100%)'
            color='gray.100'
            _hover={{
              bg:
                'linear-gradient(354deg, rgba(2,0,36,1) 0%, rgba(19,19,71,1) 60%, rgba(0,0,0,1) 100%)',
            }}
            rounded='md'
            onClick={() => router.push('dashboard')}
          >
            Dashboard
          </Button>
        </Flex>
      </Box>
      <Center p={{ base: 8, lg: 0 }}>
        <Image src='16.png' h={{ base: '220px', md: '280px', lg: '360px' }} />
      </Center>

      {/* <HeroJobCard jobs={jobs} /> */}
    </Flex>
  );
};
