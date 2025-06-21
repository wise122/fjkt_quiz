import React from "react";
import {
  Box, Button, Center, Heading, Text, VStack, HStack, Badge, Avatar, Flex, useBreakpointValue
} from "@chakra-ui/react";
import { FaTrophy } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { disconnectSocket } from "../socket";

const ResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const trophySize = useBreakpointValue({ base: "60px", md: "90px" });
  const scoreFontSize = useBreakpointValue({ base: "3xl", md: "5xl" });
  const versusFontSize = useBreakpointValue({ base: "2xl", md: "4xl" });

  return (
    <Center minH="100vh" bgGradient="linear(to-b, pink.50, pink.100)" px={{ base: 3, md: 4 }}>
      <Box
        bg="white"
        p={{ base: 5, md: 8 }}
        borderRadius="2xl"
        shadow="xl"
        border="2px solid #FBB6CE"
        maxW="md"
        w="full"
        textAlign="center"
      >
        <Heading size={{ base: "md", md: "lg" }} color="pink.500" mb={{ base: 4, md: 6 }}>
          🎉 Hasil Pertandingan
        </Heading>

        {isWinner && (
          <Center mb={{ base: 3, md: 4 }}>
            <FaTrophy size={trophySize} color="#FFD700" />
          </Center>
        )}

        <Flex justify="center" align="center" mb={{ base: 4, md: 6 }} flexWrap="wrap">
          <VStack spacing={3} mx={4} mb={{ base: 4, md: 0 }}>
            <Avatar src={yourAvatar} size={{ base: "lg", md: "xl" }} borderWidth="3px" borderColor="pink.400" />
            <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>Kamu</Text>
            <Text fontSize={scoreFontSize} color="pink.400">{yourScore}</Text>
          </VStack>

          <Text fontSize={versusFontSize} fontWeight="bold" mx={2}>VS</Text>

          <VStack spacing={3} mx={4} mb={{ base: 4, md: 0 }}>
            <Avatar src={opponentAvatar} size={{ base: "lg", md: "xl" }} borderWidth="3px" borderColor="blue.400" />
            <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>Lawan</Text>
            <Text fontSize={scoreFontSize} color="blue.400">{opponentScore}</Text>
          </VStack>
        </Flex>

        <VStack spacing={{ base: 3, md: 4 }} mt={{ base: 4, md: 6 }}>
          {isDraw ? (
            <Badge colorScheme="yellow" fontSize={{ base: "md", md: "lg" }} px={4} py={2} borderRadius="full">
              🤝 Seri!
            </Badge>
          ) : isWinner ? (
            <Badge colorScheme="green" fontSize={{ base: "md", md: "lg" }} px={4} py={2} borderRadius="full">
              🏆 Kamu Menang!
            </Badge>
          ) : (
            <Badge colorScheme="red" fontSize={{ base: "md", md: "lg" }} px={4} py={2} borderRadius="full">
              😢 Kamu Kalah
            </Badge>
          )}

          <Button colorScheme="pink" size={{ base: "md", md: "lg" }} px={{ base: 6, md: 8 }} onClick={handlePlayAgain} borderRadius="full">
            Main Lagi 🔄
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default ResultScreen;
