import { Box, SimpleGrid, Heading } from '@chakra-ui/react';
import React from 'react';

const Feature = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 1 }}
      mx={{ base: '24px', md: '40px', lg: '124px' }}
      my='12'
      gap='12'
      color='white'
    >
      <Box bg='black' rounded='md' p='6' h='420px'></Box>
    </SimpleGrid>
  );
};

export default Feature;
