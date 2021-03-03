import { ChakraContainer } from './atoms/Container';
import {
  Box,
  Heading,
  Text,
  Flex,
  Link,
  Image,
  Center,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import TextLoop from 'react-text-loop';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Newsletter } from './Newsletter';

export const Hero = ({ jobs }) => {
  return (
    <ChakraContainer mt='20'>
      <Flex
        rounded='sm'
        bg='gray.100'
        p='8'
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
                Join our online career advice conference
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
              mt='6'
              size='2xl'
              letterSpacing='-1px'
              fontWeight='bolder'
              lineHeight='1.1'
              color='gray.900'
            >
              Tired of painful job applications? We connect you with{' '}
              <TextLoop>
                <Text color='blue.600'>agencies</Text>
                <Text color='blue.600'>recruiters</Text>
                <Text color='blue.600'>business partners</Text>
              </TextLoop>
            </Heading>

            <Newsletter />
          </Flex>
        </Box>
        <Center p={{ base: 8, lg: 0 }} position='relative'>
          <Image src='16.png' h={{ base: '220px', md: '280px', lg: '360px' }} />
        </Center>

        {/* <HeroJobCard jobs={jobs} /> */}
      </Flex>
    </ChakraContainer>
  );
};
