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
  Button,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Banner } from '../Banner/Banner';
import { HeroJobCard } from './HeroJobCard';

export const Hero = ({ jobs }) => {
  const router = useRouter();
  return (
    <Box rounded="none" mt="60px" bg="black">
      <SimpleGrid
        py="12"
        px={{ base: '16px', md: '40px', lg: '420px' }}
        rounded="none"
        columns="1"
        spacing="12"
        justify="space-between"
        position="relative"
      >
        <Box rounded="none">
          <Banner w={{ base: '100%', lg: '280px' }}>
            Join our first online meetup
            <Box ml="4" mt="5px">
              <FaArrowRight />
            </Box>
          </Banner>
        </Box>
        <Box>
          <Flex direction="column" color="white">
            <Heading
              size="2xl"
              letterSpacing="-1.6px"
              fontWeight="600"
              lineHeight="1.1"
            >
              Tired of broken job forms? <br /> Simply connect with{' '}
              <TextLoop>
                <Text color="var(--color-primary)">agencies</Text>
                <Text color="var(--color-primary)">recruiters</Text>
                <Text color="var(--color-primary)">freelancers</Text>
              </TextLoop>
            </Heading>
            <Text
              colo="black"
              my="12"
              fontSize="20px"
              fontWeight="500"
              letterSpacing="-.6px"
            >
              We simply find the right job for you and connect you with the
              recruiter for that position - nothing more.️
            </Text>

            <Button
              size="lg"
              color="gray.100"
              bg="brand.900"
              _hover={{
                background: 'rgb(92,52,226, .7)',
              }}
              fontSize="14px"
              rounded="sm"
              onClick={() => router.push('/job')}
            >
              Browse open positions
            </Button>
          </Flex>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
