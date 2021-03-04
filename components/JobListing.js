import React from 'react';
import {
  Heading,
  Link,
  Tag,
  TagLabel,
  Box,
  StackDivider,
  VStack,
  Flex,
  Grid,
} from '@chakra-ui/react';
const JobListing = ({ jobs }) => {
  return (
    <div>
      <Grid gridTemplateColumns='1' align='stretch'>
        {jobs.map((job) => (
          <Flex
            px='4'
            py='6'
            key={job.id}
            rounded='none'
            borderBottom='1px solid #f3f3f4'
            transition='.2s background-color ease-in-out'
            _hover={{ bg: 'gray.50', cursor: 'pointer' }}
          >
            <Link _hover={{ textDecoration: 'none' }} href={`job/${job.id}`}>
              <Box>
                <Heading as='h3' size='lg' letterSpacing='-.8px'>
                  {job.data.title}
                </Heading>
                <Box mt='2'>
                  <Tag size='md' variant='outline' colorScheme='yellow'>
                    <TagLabel>{job.data.career_level}</TagLabel>
                  </Tag>
                  <Tag
                    size='md'
                    variant='outline'
                    colorScheme='messenger'
                    ml='3'
                  >
                    <TagLabel>{job.data.governorate}</TagLabel>
                  </Tag>
                </Box>
              </Box>
            </Link>
          </Flex>
        ))}
      </Grid>
    </div>
  );
};

export default JobListing;
