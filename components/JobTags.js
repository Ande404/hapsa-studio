import { Box } from '@chakra-ui/layout';

const JobTags = ({ tags }) => {
  if (!tags) {
    return 'Provide tags prop';
  }
  return <Box>{tags.map((tag) => tag)}</Box>;
};

export default JobTags;
