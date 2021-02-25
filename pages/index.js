import { useEffect } from 'react';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import { useRouter } from 'next/router';
import Block from '../components/Block';
import { Newsletter } from '../components/Newsletter';
import { Box, Tag, TagLabel, Heading, Text, Link } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import Feature from '../components/Feature';
export default function Home() {
  return (
    <Layout>
      <Nav />
      <Box px={{ base: '24px', md: '40px', lg: '340px' }} rounded='lg' py='12'>
        <Tag
          size='sm'
          colorScheme='blue'
          letterSpacing='-.6px'
          borderRadius='full'
          fontWeight='semibold'
          p='2'
          mb='4'
        >
          <TagLabel textDecor='uppercase'>
            Something like we are in Beta!
          </TagLabel>
        </Tag>
        <Heading
          size='2xl'
          w={['100%']}
          letterSpacing='-1.9px'
          fontWeight='bold'
          lineHeight='1.1'
        >
          Tired of painful job applications? We negotiate a job offer for you
        </Heading>
        <Text
          py='8'
          fontSize='lg'
          letterSpacing='-.2px'
          fontWeight='500'
          lineHeight='1.5'
        >
          Hapsa simplies the job hunting process. Tell us your preference and we
          will match you with the right recruiters to start your next job. Tell
          us your preference and we will match you with the right recruiters to
          start your next job
        </Text>
        <Newsletter />
      </Box>
      <Feature />
      <Block />
    </Layout>
  );
}
