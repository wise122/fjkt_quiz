import React, { useEffect } from "react";
import { Box, Button, Center, Heading, Text, VStack, HStack, Badge, Avatar, Flex } from "@chakra-ui/react";
import { FaTrophy } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { disconnectSocket } from "../socket";

const ResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let audio = null;
    if (isWinner) {
      audio = new Audio("/sound/win.mp3");
      audio.play();
    }
  
    return () => {
      if (audio) {
        audio.pause();
        audio = null;
      }
    };
  }, [isWinner]);
  

  const {
    yourScore = 0,
    opponentScore = 0,
    yourAvatar = "/images/your-avatar.png",
    opponentAvatar = "/images/opponent-avatar.png"
  } = location.state || {};

  const handlePlayAgain = () => {
    disconnectSocket();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  const isWinner = yourScore > opponentScore;
  const isDraw = yourScore === opponentScore;

  return (
    <Center minH="100vh" bgGradient="linear(to-b, pink.50, pink.100)" px={4}>
      <Box bg="white" p={8} borderRadius="2xl" shadow="xl" border="2px solid #FBB6CE" maxW="md" w="full" textAlign="center">
        <Heading size="lg" color="pink.500" mb={6}>🎉 Hasil Pertandingan</Heading>

        {isWinner && (
          <Center mb={4}>
            <FaTrophy size="90px" color="#FFD700" />
          </Center>
        )}

        <Flex justify="center" align="center" mb={6}>
          <VStack spacing={3} mx={4}>
            <Avatar src={yourAvatar} size="xl" borderWidth="3px" borderColor="pink.400" />
            <Text fontWeight="bold" fontSize="lg">Kamu</Text>
            <Text fontSize="5xl" color="pink.400">{yourScore}</Text>
          </VStack>

          <Text fontSize="4xl" fontWeight="bold" mx={2}>VS</Text>

          <VStack spacing={3} mx={4}>
            <Avatar src={opponentAvatar} size="xl" borderWidth="3px" borderColor="blue.400" />
            <Text fontWeight="bold" fontSize="lg">Lawan</Text>
            <Text fontSize="5xl" color="blue.400">{opponentScore}</Text>
          </VStack>
        </Flex>

        <HStack justify="center" spacing={4} mt={6}>
          {isDraw ? (
            <Badge colorScheme="yellow" fontSize="lg" px={4} py={2} borderRadius="full">🤝 Seri!</Badge>
          ) : isWinner ? (
            <Badge colorScheme="green" fontSize="lg" px={4} py={2} borderRadius="full">🏆 Kamu Menang!</Badge>
          ) : (
            <Badge colorScheme="red" fontSize="lg" px={4} py={2} borderRadius="full">😢 Kamu Kalah</Badge>
          )}

          <Button colorScheme="pink" size="lg" px={8} onClick={handlePlayAgain}>
            Main Lagi 🔄
          </Button>
        </HStack>

      </Box>
    </Center>
  );
};

export default ResultScreen;
