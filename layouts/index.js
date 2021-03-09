/* eslint-disable react/display-name */
import { MDXProvider } from '@mdx-js/react';
import { Text, Heading, Flex, Box, Divider } from '@chakra-ui/react';
import Nav from '../components/Nav';

const components = {
  h1: (props) => (
    <Heading fontWeight="bold" fontSize="3xl" textAlign="center">
      {props.children}
    </Heading>
  ),
  h2: (props) => (
    <Heading fontSize="xl" mt="12" mb="6" textAlign="center">
      {props.children}
    </Heading>
  ),

  p: (props) => (
    <Text mb={6} fontSize="18px" fontWeight="normal">
      {props.children}
    </Text>
  ),
};
const Index = ({ children, frontMatter }) => (
  <div>
    <Nav />
    <Box mt="28">
      <MDXProvider components={components}>
        <Flex
          textAlign="center"
          flexDirection="column"
          px={{ base: 4, md: 12, lg: 60 }}
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

export default Index;
