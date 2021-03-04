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
import { Banner } from './Banner';
export const Hero = ({ jobs }) => {
  return (
    <ChakraContainer mt='20'>
      <Flex
        rounded='sm'
        bg='rgb(216,236,241)'
        p={{ base: 4, lg: 8 }}
        justify='space-between'
        direction={{ base: 'column', lg: 'row' }}
        position='relative'
        rounded='lg'
      >
        <Box>
          <Banner arrow='right'>
            <div>
              <Heading
                as={Link}
                size='md'
                letterSpacing='-.8px'
                fontWeight='semibold'
                mb='4'
              >
                Join our first online hackathon with friends
              </Heading>
              <ArrowForwardIcon ml='2' />
            </div>
          </Banner>
          <Flex mt='14' direction='column' w={{ base: '100%', lg: '620px' }}>
            <Heading
              size='2xl'
              letterSpacing='-1.6px'
              fontWeight='bolder'
              lineHeight='1.1'
              color='black'
            >
              Tired of painful job applications? We connect you with{' '}
              <TextLoop>
                <Text color='rgb(92,52,226)'>agencies</Text>
                <Text color='rgb(92,52,226)'>recruiters</Text>
                <Text color='rgb(92,52,226)'>business partners</Text>
              </TextLoop>
            </Heading>

            <Box mt='8'>
              <Text>Get notified when we lauch our beta program</Text>
            </Box>

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
