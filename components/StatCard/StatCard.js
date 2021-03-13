import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';

export const StatCard = ({ label, value }) => (
  <Stat
    px={{ base: 4, sm: 6 }}
    py="5"
    bg="white"
    shadow="base"
    rounded="lg"
    key={label}
  >
    <StatLabel
      fontWeight="500"
      color="gray.500"
      fontSize="md"
      letterSpacing="-.4px"
    >
      {label}
    </StatLabel>
    <StatNumber
      fontSize="2xl"
      fontWeight="500"
      letterSpacing="-1px"
      color="gray.900"
      mt="1"
    >
      {value}
    </StatNumber>
  </Stat>
);
