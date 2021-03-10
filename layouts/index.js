/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { MDXProvider } from '@mdx-js/react';
import { Text, Heading, Flex, Box, Divider } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Nav } from '../components/Nav/Nav';

const MdxWrapper = {
  h1: ({ children }) => (
    <Heading fontWeight="bold" fontSize="3xl" textAlign="center">
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading fontSize="xl" mt="12" mb="6" textAlign="center">
      {children}
    </Heading>
  ),

  p: ({ children }) => (
    <Text mb={6} fontSize="18px" fontWeight="normal">
      {children}
    </Text>
  ),
};
const Index = ({ children, frontMatter }) => (
  <div>
    <Nav />
    <Box mt="28">
      <MDXProvider components={MdxWrapper}>
        <Flex
          textAlign="center"
          flexDirection="column"
          px={{ base: 4, md: 12, lg: '340px' }}
          margin="0 auto"
        >
          <Heading color="rgb(92,52,226)" size="xl" letterSpacing="-1px" mb="4">
            {frontMatter.title}
          </Heading>
          <Flex
            textAlign="center"
            justify="center"
            align="center"
            direction="column"
          >
            <Text fontSize="lg" textAlign="center">
              {' '}
              {frontMatter.author}
            </Text>
            <Text mt="2" fontSize="sm" color="gray.600" textAlign="center">
              {frontMatter.timestamp}
            </Text>
          </Flex>

          <Divider my="12" />

          <Box textAlign="left" lineHeight="28px">
            {children}
          </Box>
        </Flex>
      </MDXProvider>
    </Box>
  </div>
);

Index.propTypes = {
  frontMatter: PropTypes.object,
  children: PropTypes.node,
};

export default Index;
