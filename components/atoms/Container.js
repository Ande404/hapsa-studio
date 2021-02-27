import { Box } from '@chakra-ui/layout';
import { down, up } from 'styled-breakpoints';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 2rem;

  ${up('md')} {
    padding: 0 6rem;
  }
`;

export const ChakraContainer = (props) => {
  return <Box px={{ base: '24px', md: '40px', lg: '80px' }} {...props}></Box>;
};

// sm: '576px',
// md: '768px',
// lg: '992px',
// xl: '1200px',
