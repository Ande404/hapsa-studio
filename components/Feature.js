import { Box, SimpleGrid, Text, Spacer } from '@chakra-ui/react';
import { AtSignIcon } from '@chakra-ui/icons';
import { FiFeather, FiShield } from 'react-icons/fi';
import { ChakraContainer } from './atoms/Container';

const cardsData = [
  {
    icon: <FiShield size='20' />,
    bg: 'gray.900',
    header: 'Privacy-focused',
    info: 'We do not collect or share any information',
  },
  {
    icon: <AtSignIcon size='20' />,
    bg: 'gray.900',
    header: 'Connect',
    info: 'Once we connect with you with the recruiter you can connect',
  },
  {
    icon: <FiFeather size='20' />,
    bg: 'gray.900',
    header: 'Career Advice',
    info: 'Learn from industry professional and recruiters',
  },
];
const Feature = () => {
  return (
    <ChakraContainer mt='8'>
      <SimpleGrid columns={[1, 1, 3]} spacing='40px'>
        {cardsData.map(({ icon, bg, header, info }) => {
          return (
            <Box key={header} rounded='lg' bg={bg} color='white' p='8'>
              {icon}

              <Spacer />
              <Text mt='5' fontWeight='700'>
                {header}
              </Text>
              <Text mt='2' fontWeight='500'>
                {info}
              </Text>
            </Box>
          );
        })}
      </SimpleGrid>
    </ChakraContainer>
  );
};

export default Feature;
