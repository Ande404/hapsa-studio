import React from 'react';
import {
  Heading,
  Link,
  Tag,
  TagLabel,
  Box,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
const JobListing = ({ jobs }) => {
  return (
    <div>
      <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={6}
        align='stretch'
      >
        {jobs.map((job) => (
          <Box key={job.id} rounded='none'>
            <Link _hover={{ textDecoration: 'none' }} href={`job/${job.id}`}>
              <Box>
                <Heading as='h3' size='lg' letterSpacing='-1.2px'>
                  {job.data.title}
                </Heading>
                <Box mt='4'>
                  <Tag size='md' variant='solid' colorScheme='gray'>
                    <TagLabel>{job.data.career_level}</TagLabel>
                  </Tag>
                  <Tag size='md' variant='solid' colorScheme='gray' ml='3'>
                    <TagLabel>{job.data.governorate}</TagLabel>
                  </Tag>
                </Box>
              </Box>
            </Link>
          </Box>
        ))}
      </VStack>
    </div>
  );
};

export default JobListing;
