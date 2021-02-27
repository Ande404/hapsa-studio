import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Block from '../components/Block';
import { Newsletter } from '../components/Newsletter';
import { Box, Tag, TagLabel, Heading, Text, Link } from '@chakra-ui/react';
import { Hero } from '../components/Hero';
import Feature from '../components/Feature';
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Box
        px={{ base: '16px', md: '40px', lg: '80px' }}
        pt={{ base: 32, lg: 16 }}
      >
        <Heading
          size='lg'
          letterSpacing='-.8px'
          fontWeight='semibold'
          lineHeight='1.1'
        >
          Opportunity at no cost
        </Heading>
      </Box>
    </>
  );
}
