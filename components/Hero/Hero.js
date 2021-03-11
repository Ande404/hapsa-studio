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
import { Banner } from '../Banner';

export const Hero = () => (
  <Box
    mt={{ base: '45px', lg: '70px' }}
    px={{ base: '0', md: '40px', lg: '160px' }}
    as="section"
  >
    <Flex
      p="12"
      justify="space-between"
      direction={{ base: 'column', lg: 'row' }}
      position="relative"
      rounded={{ base: 'none', lg: 'md' }}
    >
      <Box>
        <Flex direction="column" w={{ base: '100%', lg: '620px' }}>
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
        </Flex>
      </Box>
      <Box
      // pr={{ base: 0, lg: 16 }}
      // pt={{ base: 8, lg: 0 }}
      // position="relative"
      >
        <Banner
          bg="brand.900"
          px="4"
          py="4"
          color="gray.50"
          rounded="md"
          mb="6"
        >
          <Box>
            <Heading
              as={Link}
              size="sm"
              letterSpacing="-.3px"
              fontWeight="semibold"
              mb="4"
            >
              Join our first online hackathon with friends
            </Heading>
            <ArrowForwardIcon ml="2" />
          </Box>
        </Banner>
      </Box>
    </Flex>
  </Box>
);
