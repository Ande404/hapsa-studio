/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Flex,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export const Banner = ({ children, arrow, ...props }) => (
  <Box
    {...props}
    data-testid="banner"
    bg="rgb(92,52,226, .3)"
    px="4"
    py="4"
    borderLeftRadius="0"
    rounded="md"
    transition="all .15s ease-in"
    border="2px solid rgb(92,52,226, .7)"
    color="brand.900"
    _hover={{
      color: 'black',
      background: 'brand.900',
      cursor: 'pointer',
    }}
  >
    <NextLink href="/">
      <Link size="sm" letterSpacing="-.3px" fontWeight="semibold">
        <Flex>{children}</Flex>
      </Link>
    </NextLink>
  </Box>
);
