import { Box, Heading, Stack } from '@chakra-ui/react';
import { ChakraContainer } from '../components/atoms/Container';
import Nav from '../components/Nav';

const data = [
  {
    id: 1,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];
const Recruiter = () => {
  return (
    <div>
      <Nav />
      <ChakraContainer mt='20'>
        <Heading letterSpacing='-.8px' fontSize='xl'>
          Recruiter
        </Heading>
        <Stack direction='row' spacing='12' mt='12'>
          {data.map(({ id }) => {
            return (
              <Box
                rounded='md'
                key={id}
                bg='gray.400'
                p='6'
                height='90px'
                width='220px'
              >
                hii
              </Box>
            );
          })}
        </Stack>
      </ChakraContainer>
    </div>
  );
};

export default Recruiter;
