import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';

export const StatCard = (props) => {
  const { label, value } = props.data;
  return (
    <Stat px={{ base: 4, sm: 6 }} py="5" bg="white" shadow="base" rounded="lg">
      <StatLabel fontWeight="medium" color="gray.500" fontSize="md">
        {label}
      </StatLabel>
      <StatNumber
        fontSize="3xl"
        fontWeight="semibold"
        letterSpacing="-1px"
        color="gray.900"
        mt="1"
      >
        {value}
      </StatNumber>
    </Stat>
  );
};
