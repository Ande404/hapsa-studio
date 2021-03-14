import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Flex, Button, Heading, Link, Text } from '@chakra-ui/react';
import { FiFeather } from 'react-icons/fi';

export const Footer = () => (
  <div>
    <Box
      borderTop="1.5px solid #CBD5E0"
      as="footer"
      px={{ base: '16px', md: '40px', lg: '320px' }}
      pt="140px"
      py="4"
      bg="black"
    >
      <NextLink href="/">
        <Link _hover={{ textDecor: 'none' }}>
          <Flex direction="row" align="center">
            <FiFeather size="20" color="white" />{' '}
          </Flex>
        </Link>
      </NextLink>
    </Box>
  </div>
);
