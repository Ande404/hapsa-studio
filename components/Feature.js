import { Box, Image, Text, Spacer, Stack } from '@chakra-ui/react';
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
    mx={{ base: '16px', md: '40px', lg: '320px' }}
    bg="brand.800"
    h="220px"
    my="20"
    p="8"
    rounded="lg"
  >
    Graphics here
    {/* <Stack direction={['column', 'column', 'row']} spacing="120px"> */}
    {/*  {cardsData.map(({ icon, bg, header, info, img }) => ( */}
    {/*    <Box key={header} rounded="sm" w="100%"> */}
    {/*      /!* {icon} *!/ */}
    {/*      <Text mt="5" fontWeight="700" color="rgb(100,25,221)"> */}
    {/*        {header} */}
    {/*      </Text> */}
    {/*      <Box bg={bg} my="4" h="320px" w="100%" /> */}
    {/*      <Text mt="2" fontWeight="500"> */}
    {/*        {info} */}
    {/*      </Text> */}
    {/*    </Box> */}
    {/*  ))} */}
    {/* </Stack> */}
  </Box>
);

export default Feature;
