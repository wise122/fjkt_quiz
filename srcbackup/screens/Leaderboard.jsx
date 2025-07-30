import React, { useEffect, useState } from "react";
import {
  Box, Heading, VStack, Avatar, Text, Spinner, Center, HStack, Badge
} from "@chakra-ui/react";
import axios from "axios";
import Header from "../components/Header";
import { FaStar, FaMedal } from "react-icons/fa";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://q.sfinbusinesssolution.net/api/leaderboard")
      .then(res => {
        setLeaderboard(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center minH="100vh" bgGradient="linear(to-br, pink.50, pink.100)">
        <Spinner size="xl" color="pink.400" />
      </Center>
    );
  }

  return (
    <Center minH="100vh" bgGradient="linear(to-br, pink.50, pink.100)" px={4}>
      <Box bg="white" p={8} borderRadius="2xl" shadow="2xl" w="full" maxW="lg">
        <Header />
        <Heading mb={6} fontSize="2xl" color="pink.500">
          Leaderboard
        </Heading>
        <VStack spacing={4} align="stretch">
          {leaderboard.length === 0 ? (
            <Text>Tidak ada data.</Text>
          ) : (
            leaderboard.map((player, index) => (
              <HStack key={index} p={3} border="2px solid pink" borderRadius="xl" bg="pink.50" spacing={4}>
                <Badge colorScheme="pink" variant="solid" px={3} py={1} borderRadius="full">
                  {index === 0 ? <FaMedal color="gold" /> : `#${index + 1}`}
                </Badge>
                <Avatar src={player.avatar} name={player.username} bg="pink.200" />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold">{player.username}</Text>
                  <HStack>
                    <FaStar color="gold" />
                    <Text>{player.score} Poin</Text>
                  </HStack>
                </VStack>
              </HStack>
            ))
          )}
        </VStack>
      </Box>
    </Center>
  );
}

export default Leaderboard;
