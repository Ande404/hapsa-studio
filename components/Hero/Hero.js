import TextLoop from 'react-text-loop';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Text,
  Flex,
  Link,
  Image,
  Center,
} from '@chakra-ui/react';
import { Newsletter } from '../Newsletter';
import { Banner } from '../Banner';

export const Hero = () => (
  <Box
    mt={{ base: '45px', lg: '70px' }}
    px={{ base: '0', md: '40px', lg: '160px' }}
    as="section"
  >
    <Flex
      bg="gray.200"
      px={{ base: 4, lg: 8 }}
      py={{ base: 12, lg: 6 }}
      justify="space-between"
      direction={{ base: 'column', lg: 'row' }}
      position="relative"
      rounded={{ base: 'none', lg: 'md' }}
    >
      <Box>
        <Banner arrow="right">
          <div>
            <Heading
              as={Link}
              size="md"
              letterSpacing="-.8px"
              fontWeight="semibold"
              mb="4"
            >
              Join our first online hackathon with friends
            </Heading>
            <ArrowForwardIcon ml="2" />
          </div>
        </Banner>
        <Flex mt="14" direction="column" w={{ base: '100%', lg: '620px' }}>
          <Heading
            size="2xl"
            letterSpacing="-1.6px"
            fontWeight="bolder"
            lineHeight="1.1"
            color="black"
          >
            Tired of painful job applications? We connect you with{' '}
            <TextLoop>
              <Text color="brand.900">agencies</Text>
              <Text color="brand.900">recruiters</Text>
              <Text color="brand.900">freelancers</Text>
            </TextLoop>
          </Heading>

          <Box mt="8">
            <Text>Get notified when we lauch our beta program</Text>
          </Box>

          <Newsletter />
        </Flex>
      </Box>
      <Center
        pr={{ base: 0, lg: 16 }}
        pt={{ base: 8, lg: 0 }}
        position="relative"
      >
        <Image src="16.png" h={{ base: '220px', md: '280px', lg: '360px' }} />
      </Center>
    </Flex>
  </Box>
);
