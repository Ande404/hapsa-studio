import { ChakraContainer } from '../components/atoms/Container';
import { MDXProvider } from '@mdx-js/react';
import { Text, Heading, Flex, Box } from '@chakra-ui/react';

const components = {
  h1: (props) => (
    <Text fontWeight='bold' fontSize='3xl' mb={3}>
      {props.children}
    </Text>
  ),
  h2: (props) => (
    <Heading fontSize='xl' my={3}>
      {props.children}
    </Heading>
  ),

  p: (props) => <Text my={2}>{props.children}</Text>,
};
const index = (props) => {
  console.log(props);
  return (
    <ChakraContainer mt='28'>
      <MDXProvider components={components}>
        <Flex
          textAlign='center'
          flexDirection='column'
          maxWidth='620px'
          margin='0 auto'
        >
          <Heading color='blue.400' size='xl' letterSpacing='-1px'>
            {props.frontMatter.title}
          </Heading>
          <section>{props.children}</section>
        </Flex>
      </MDXProvider>
    </ChakraContainer>
  );
};

export default index;
