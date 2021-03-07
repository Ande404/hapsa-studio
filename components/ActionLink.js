import { chakra, useColorModeValue } from '@chakra-ui/react';

export const ActionLink = (props) => (
  <chakra.a
    {...props}
    as="a"
    href="#"
    px="4"
    textAlign="center"
    py="1"
    fontSize="xs"
    borderWidth="1px"
    borderColor={useColorModeValue('blue.400', 'whiteAlpha.300')}
    fontWeight="semibold"
    rounded="base"
    _hover={{ bg: 'whiteAlpha.200' }}
  />
);
