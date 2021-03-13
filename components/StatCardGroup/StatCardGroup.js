import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';

import { StatCard } from './StatCard';

export const StatCardGroup = ({ stats }) => {
  const formmatedStat = formatStat(stats);

  return (
    <div>
      <SimpleGrid
        // px={{ base: '6', md: '8' }}
        columns={{ base: 1, md: 3 }}
        maxW="7xl"
        spacing="6"
      >
        {formmatedStat.map(({ label, value }) => (
          <StatCard label={label} value={value} />
        ))}
      </SimpleGrid>
    </div>
  );
};

const formatStat = (raw) =>
  raw.map((el) => {
    for (const [key, value] of Object.entries(el)) {
      return {
        label: key,
        value,
      };
    }
  });
