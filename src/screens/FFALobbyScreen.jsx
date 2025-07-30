import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Text, VStack, Button, Avatar, HStack, Spinner, useToast } from '@chakra-ui/react';
import { getSocket } from '../socket';

const FFALobbyScreen = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const searchParams = new URLSearchParams(location.search);
  const playerId = searchParams.get("playerId") || localStorage.getItem("playerId");

  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    socket.emit("joinFFARoom", { roomCode, playerId });

    socket.on("roomUpdateFFA", (data) => {
      setPlayers(data.players);
    });

    socket.on("hostAssigned", () => {
      setIsHost(true);
    });

    socket.on("battleStarted", () => {
      navigate(`/ffa-battle/${roomCode}?playerId=${playerId}`);
    });

    socket.on("roomFull", () => {
      toast({ title: "Room sudah penuh", status: "error", duration: 2000 });
      navigate("/");
    });

    socket.on("opponentLeft", () => {
      toast({ title: "Seseorang keluar", status: "warning", duration: 2000 });
      navigate("/");
    });

    return () => {
      socket.off("roomUpdateFFA");
      socket.off("hostAssigned");
      socket.off("battleStarted");
      socket.off("roomFull");
      socket.off("opponentLeft");
    };
  }, [roomCode, navigate, toast, playerId]);

  const handleStartBattle = () => {
    const socket = getSocket();
    socket.emit("startFFABattle", { roomId: roomCode });
  };

  return (
    <VStack minH="100vh" justify="center" bg="yellow.50" p={4}>
      <Box bg="white" p={6} rounded="xl" shadow="lg" w="full" maxW="400px">
        <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
          Menunggu Pemain
        </Text>

        <VStack spacing={4}>
          {players.map((player, idx) => (
            <HStack key={player.playerId} w="full" justify="space-between">
              <HStack>
                <Avatar src={player.avatar} name={player.username} size="md" />
                <Text fontWeight="semibold">{player.username}</Text>
              </HStack>
              <Text fontSize="sm" color="gray.500">Slot #{idx + 1}</Text>
            </HStack>
          ))}

          {players.length < 4 && (
            <VStack mt={4}>
              <Spinner color="yellow.400" />
              <Text fontSize="sm" color="gray.400">Menunggu pemain lain...</Text>
            </VStack>
          )}
        </VStack>

        {isHost && players.length === 4 && (
          <Button mt={6} colorScheme="yellow" w="full" size="lg" onClick={handleStartBattle}>
            Mulai Battle!
          </Button>
        )}
      </Box>
    </VStack>
  );
};

export default FFALobbyScreen;
