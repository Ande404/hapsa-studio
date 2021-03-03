import { Box, SimpleGrid, Text, Spacer } from '@chakra-ui/react';
const Feature = () => {
  return (
    <div>
      <SimpleGrid
        py='12'
        columns={[1, 1, 3]}
        spacing='40px'
        px={{ base: '24px', md: '40px', lg: '160px' }}
      >
        <Box
          rounded='lg'
          transition='.08s background-color ease-in'
          height='180px'
          bg='blue.200'
          p='6'
        >
          <svg
            width='22'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>

          <Spacer />
          <Text mt='5' letterSpacing='-0.8px' fontWeight='700'>
            Extract Data
          </Text>
          <Text letterSpacing='-0.8px' mt='2' fontWeight='500'>
            You can access all your files and folders with an easy to use links
          </Text>
        </Box>
      </SimpleGrid>
    </div>
  );
};

export default Feature;
