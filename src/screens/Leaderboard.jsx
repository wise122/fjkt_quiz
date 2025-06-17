import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { getLeaderboard } from '../api/leaderboard';

const Leaderboard = () => {
  const scores = getLeaderboard();

  return (
    <Box p={4} mt={6} shadow="md" borderWidth="1px" borderRadius="md">
      <Text fontSize="xl" mb={3}>🏆 Leaderboard</Text>
      <VStack align="start" spacing={2}>
        {scores.map((s, i) => (
          <Text key={i}>{i + 1}. {s.name} - {s.score}</Text>
        ))}
      </VStack>
    </Box>
  );
};

export default Leaderboard;
