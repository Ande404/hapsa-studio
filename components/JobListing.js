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
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const JobListing = ({ jobs }) => (
  <div>
    <Grid gridTemplateColumns="1" align="stretch">
      {jobs.map((job) => (
        <Flex
          key={job.id}
          rounded="none"
          borderBottom="1px solid #f3f3f4"
          transition=".2s background-color ease-in-out"
          _hover={{ bg: 'gray.50', cursor: 'pointer' }}
        >
          <NextLink href={`/job/${job.id}`}>
            {/*  i think next/link doesn't like the link to be nested */}
            <a>
              <Box px="4" py="6">
                <Heading as="h3" size="lg" letterSpacing="-.8px">
                  {job.data.title}
                </Heading>

                <Box mt="2">
                  <Tag size="md" variant="outline" colorScheme="yellow">
                    <TagLabel>{job.data.career_level}</TagLabel>
                  </Tag>
                  <Tag
                    size="md"
                    variant="outline"
                    colorScheme="messenger"
                    ml="3"
                  >
                    <TagLabel>{job.data.governorate}</TagLabel>
                  </Tag>
                </Box>
              </Box>
            </a>
          </NextLink>
        </Flex>
      ))}
    </Grid>
  </div>
);

export default JobListing;
