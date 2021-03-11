import TextLoop from 'react-text-loop';
import { FaArrowRight } from 'react-icons/fa';
import {
  Box,
  Heading,
  Text,
  Flex,
  Link,
  Image,
  Center,
  SimpleGrid,
} from '@chakra-ui/react';
import { Banner } from '../Banner';
import { HeroJobCard } from './HeroJobCard';

export const Hero = ({ jobs }) => (
  <Box
    pt={{ base: '10px', lg: '40px' }}
    px={{ base: '16px', md: '40px', lg: '220px' }}
    as="section"
    h="360px"
    bg="black"
  >
    <SimpleGrid
      columns={[1, null, 2]}
      spacing="12"
      mt="16"
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
            lineHeight="1.14"
            color="white"
          >
            Tired of broken job applications? We connect you with{' '}
            <TextLoop>
              <Text color="brand.900">agencies</Text>
              <Text color="brand.900">recruiters</Text>
              <Text color="brand.900">freelancers</Text>
            </TextLoop>
          </Heading>
        </Flex>
      </Box>
      <Box>
        <Banner
          bg="rgb(92,52,226, .2)"
          px="4"
          py="4"
          borderLeftRadius="0"
          mb="6"
          rounded="md"
          color="rgb(92,52,226, 1)"
          _hover={{
            color: 'black',
            background: 'rgb(92,52,226, 1)',
            cursor: 'pointer',
          }}
        >
          <Flex>
            <Heading
              as={Link}
              size="sm"
              letterSpacing="-.3px"
              fontWeight="semibold"
            >
              Join our first online meetup
            </Heading>
            <Box ml="4">
              <FaArrowRight />
            </Box>
          </Flex>
        </Banner>
      </Box>
    </SimpleGrid>
  </Box>
);
