import { Box, SimpleGrid, Text, Spacer } from '@chakra-ui/react';
const Feature = () => {
  return (
    <div>
      <SimpleGrid
        py='12'
        columns={[1, 1, 3]}
        spacing='40px'
        px={{ base: '24px', md: '40px', lg: '340px' }}
      >
        <Box
          rounded='lg'
          transition='.08s background-color ease-in'
          height='170px'
          bg='blue.200'
          p='8'
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
        <Box rounded='lg' height='170px'>
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
              d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
            />
          </svg>

          <Spacer />
          <Text mt='5' letterSpacing='-0.8px' fontWeight='700'>
            Unlimited Storage
          </Text>
          <Text letterSpacing='-0.8px' mt='2' fontWeight='500'>
            You can access all your files and folders with an easy to use links
          </Text>
        </Box>
        <Box rounded='lg' height='170px'>
          <svg
            width='20'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
            />
          </svg>

          <Spacer />
          <Text mt='5' letterSpacing='-0.8px' fontWeight='700'>
            Share Resource Link
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
