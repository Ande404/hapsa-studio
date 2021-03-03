import { Box } from '@chakra-ui/react';
export const ChakraContainer = (props) => {
  return props.margin ? (
    <Box mx={{ base: '16px', md: '40px', lg: '160px' }} {...props}>
      {props.children}
    </Box>
  ) : (
    <Box px={{ base: '16px', md: '40px', lg: '160px' }} {...props}>
      {' '}
      {props.children}
    </Box>
  );
};
