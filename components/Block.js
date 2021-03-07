import { Box, SimpleGrid, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const Block = () => (
  <SimpleGrid
    columns={{ base: 1, md: 1 }}
    mx={{ base: '24px', md: '40px', lg: '340px' }}
    my="12"
    gap="12"
    color="white"
  >
    <Box
      bgGradient="linear(to right, gray.900, gray.800)"
      rounded="md"
      p="6"
      h="320px"
      position="relative"
    >
      <Heading color="white" letterSpacing="-1px" size="md">
        Discover exciting ways to connect with recruiters
      </Heading>
    </Box>
  </SimpleGrid>
);

export default Block;
