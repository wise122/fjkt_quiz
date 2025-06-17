import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Button,
  useToast,
  Badge,
  Center,
} from '@chakra-ui/react';

const VersusRoom = () => {
  const { roomCode } = useParams();
  const [opponentJoined, setOpponentJoined] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Simulasi lawan masuk (nanti diganti socket.io)
    const timer = setTimeout(() => {
      setOpponentJoined(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartGame = () => {
    toast({
      title: 'Game Dimulai!',
      status: 'success',
      duration: 1500,
      isClosable: true,
    });

    // TODO: navigasi ke halaman kuis versus
  };

  return (
    <VStack minH="100vh" justify="center" px={4} bgGradient="linear(to-br, red.50, pink.100)">
      <Box
        p={8}
        bg="white"
        rounded="2xl"
        shadow="2xl"
        textAlign="center"
        maxW="md"
        w="full"
      >
        <Heading size="sm" color="red.500" mb={2}>
            🎮 Ruang Tantangan 1 vs 1
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          Bagikan kode berikut ke temanmu
        </Text>

        <Badge
          colorScheme="red"
          fontSize="2xl"
          p={3}
          rounded="full"
          mb={6}
        >
          {roomCode}
        </Badge>

        {!opponentJoined ? (
          <>
            <Spinner size="xl" color="red.400" thickness="4px" />
            <Text mt={4} color="gray.500">
              Menunggu lawan bergabung...
            </Text>
            <Text fontSize="2xl" mt={2}>⏳</Text>
          </>
        ) : (
          <>
            <Text fontWeight="bold" color="green.500" fontSize="lg" mb={2}>
              ✅ Lawan telah bergabung!
            </Text>
            <Text fontSize="2xl" mb={4}>🔥</Text>
            <Button
              colorScheme="red"
              size="lg"
              borderRadius="full"
              onClick={handleStartGame}
              w="full"
            >
              Mulai Kuis
            </Button>
          </>
        )}
      </Box>
    </VStack>
  );
};

export default VersusRoom;
