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
          <Flex key={job.id} rounded='none'>
            <Link _hover={{ textDecoration: 'none' }} href={`job/${job.id}`}>
              <Box>
                <Heading as='h3' size='lg' letterSpacing='-.8px'>
                  {job.data.title}
                </Heading>
                <Box mt='4'>
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
      </VStack>
    </div>
  );
};

export default JobListing;
