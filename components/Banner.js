/* eslint-disable react/jsx-props-no-spreading */
import { Box } from '@chakra-ui/layout';
import NextLink from 'next/link';

export const Banner = ({ children, arrow, ...props }) => (
  <Box {...props}>
    <NextLink href="/">
      <a>{children}</a>
    </NextLink>
  </Box>
);
