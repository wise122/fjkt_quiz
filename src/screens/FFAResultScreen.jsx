import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, VStack, Text, Avatar, HStack, Button } from '@chakra-ui/react';

const FFAResultScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const playersData = JSON.parse(query.get("results") || "[]");

  const sortedResults = playersData.sort((a, b) => b.score - a.score);

  return (
    <VStack minH="100vh" justify="center" bg="blue.50" p={4}>
      <Box bg="white" p={6} rounded="xl" shadow="lg" w="full" maxW="500px">
        <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center" color="blue.500">
          Hasil Battle
        </Text>

        <VStack spacing={4} w="full">
          {sortedResults.map((player, index) => (
            <HStack
              key={player.playerId}
              w="full"
              bg={index === 0 ? 'yellow.100' : 'gray.100'}
              p={3}
              rounded="md"
              justify="space-between"
            >
              <HStack>
                <Avatar src={player.avatar} name={player.username} size="md" />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="semibold">{player.username}</Text>
                  <Text fontSize="sm" color="gray.500">Score: {player.score}</Text>
                </VStack>
              </HStack>
              <Text fontSize="lg" fontWeight="bold" color="blue.500">
                #{index + 1}
              </Text>
            </HStack>
          ))}
        </VStack>

        <Button mt={6} colorScheme="blue" size="lg" w="full" onClick={() => navigate("/")}>
          Kembali ke Home
        </Button>
      </Box>
    </VStack>
  );
};

export default FFAResultScreen;
