import {
  Box,
  Image,
  Text,
  Spacer,
  Stack,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import { AtSignIcon } from '@chakra-ui/icons';
import { FiFeather, FiShield } from 'react-icons/fi';

const cardsData = [
  {
    icon: <FiShield size="20" />,
    bg: 'gray.300',
    img:
      'https://images.unsplash.com/photo-1581093196277-9f608bb3d4b6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjV8fGZlbWFsZSUyMGJ1c2luZXNzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    header: 'Privacy-focused',
    info: 'We do not collect or share any information',
  },
  {
    icon: <AtSignIcon size="20" />,
    bg: 'gray.300',
    img:
      'https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80',
    header: 'Connect',
    info: 'Once we connect with you with the recruiter you can connect',
  },
];
const Feature = () => (
  <Box
    pt="20"
    px={{ base: '16px', md: '40px', lg: '420px' }}
    bg="var(--color-black)"
  >
    <Stack color="white" direction="column" py="12">
      <Text color="var(--color-tertiary)" fontWeight="600">
        Privacy
      </Text>
      <Heading mb="6" letterSpacing="-1px" fontWeight="500">
        Minimal dashboard to get more information
      </Heading>
      <Box w="100%" h="320px" bg="gray.400" rounded="md" />
    </Stack>
  </Box>
);

export default Feature;
