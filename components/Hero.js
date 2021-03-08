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
import { Newsletter } from './Newsletter';
import { Banner } from './Banner';
import { ChakraContainer } from './atoms/Container';
import {HeroJobCard} from "./HeroJobCard"
export const Hero = ({ jobs }) => (
  <ChakraContainer mt={{base: "40px", lg: "65px"}}  px={{ base: '0', lg: '160px' }} >
    <Flex
      rounded="sm"
      bg="gray.200"
      p={{ base: 12, lg: 8 }}
      justify="space-between"
      direction={{ base: 'column', lg: 'row' }}
      position="relative"
      rounded={{base: "none", lg: "md"}}
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
      <Center p={{ base: 8, lg: 0 }} position="relative">
        {/* <HeroJobCard jobs={jobs}/> */}
        <Image src="16.png" h={{ base: '220px', md: '280px', lg: '360px' }} />
      </Center>
    </Flex>
  </ChakraContainer>
);
