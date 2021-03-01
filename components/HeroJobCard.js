import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Link,
  Divider,
  Button,
} from '@chakra-ui/react';
import TextLoop from 'react-text-loop';
import NextLink from 'next/link';
export const HeroJobCard = ({ jobs }) => {
  return (
    <div>
      <Box
        transform='translateY(45%)'
        position='sticky'
        right={{ base: '16px', md: '40px', lg: '80px' }}
        boxShadow='sm'
        bg='gray.500'
        // bg='rgb(216,236,241)'
        p={{ base: 4, lg: 8 }}
        w={{ base: '100%', lg: '420px' }}
        minHeight='320px'
        color='rgb(216,236,241)'
      >
        {/* this is a sin but it will do for now */}
        <TextLoop interval='5500'>
          {jobs.map(({ data: job }) => {
            return (
              <div key={job.jobId}>
                <NextLink href={`job/${job.jobId}`}>
                  <Link
                    fontWeight='semibold'
                    letterSpacing='-.4px'
                    letterSpacing='-.5px'
                  >
                    {job.title}
                  </Link>
                </NextLink>
              </div>
            );
          })}
        </TextLoop>
        <Divider py={{ base: 1, lg: 2 }} />
        <TextLoop interval='5500' delay='75'>
          {jobs.map(({ data: job }) => {
            return (
              <div key={job.jobId}>
                {' '}
                <Text fontWeight='semibold' letterSpacing='-.4px' mt='3'>
                  {job.governorate}
                </Text>
              </div>
            );
          })}
        </TextLoop>
      </Box>
    </div>
  );
};
