import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Heading, Text, VStack, Spinner, Button, useToast, Badge, Avatar, HStack
} from '@chakra-ui/react';
import { getSocket, connectSocket } from '../socket';

const VersusRoom = () => {
  const { roomCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username") || "Kamu";
  const avatar = decodeURIComponent(searchParams.get("avatar") || "");
  const member = searchParams.get("member") || "";

  const [opponent, setOpponent] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [bothReady, setBothReady] = useState(false);

  useEffect(() => {
    connectSocket("manual");
    const socket = getSocket();

    console.log("[Socket] Connecting to server...");
    socket.emit("joinRoom", { roomCode, username, avatar, member });
    console.log(`[Socket] Sent joinRoom for roomCode ${roomCode}`);

    socket.on("joinedRoom", (data) => {
      console.log("[Socket] joinedRoom:", data);
      setPlayerId(data.playerId);
      setIsHost(data.isHost);
      localStorage.setItem("playerId", data.playerId);  // simpan ke localStorage
    });
    

    socket.on("matchFound", (data) => {
      console.log("[Socket] matchFound:", data);
      setPlayerId(data.playerId);
      setIsHost(data.isHost);
      if (data.opponentName) {
        setOpponent({
          username: data.opponentName,
          avatar: data.opponentAvatar
        });
      }
    });

    socket.on("roomUpdate", ({ playerCount }) => {
      console.log("[Socket] roomUpdate:", playerCount);
      if (playerCount === 2) {
        toast({
          title: "Lawan sudah masuk",
          status: "info",
          duration: 1500,
          isClosable: true,
        });
      }
    });

    socket.on("playerReadyUpdate", ({ player1Ready, player2Ready }) => {
      console.log("[Socket] playerReadyUpdate:", { player1Ready, player2Ready });
      const both = player1Ready && player2Ready;
      setBothReady(both);
    });

    socket.on("opponentLeft", () => {
      console.log("[Socket] opponentLeft");
      toast({
        title: "Lawan keluar",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    });

    // Penting: listen juga startBattle biar tahu kapan battle dimulai
    socket.on("battleStarted", ({ roomId }) => {
      const savedPlayerId = localStorage.getItem("playerId");  // <- Ambil dari localStorage
      console.log("[Socket] battleStarted:", roomId, savedPlayerId);
      navigate(`/versus/battle/${roomId}?playerId=${savedPlayerId}`);
    });
    

    // Juga log error event bawaan socket.io
    socket.on("connect_error", (err) => {
      console.error("[Socket] connect_error:", err);
    });

    socket.on("disconnect", (reason) => {
      console.warn("[Socket] disconnected:", reason);
    });

    return () => {
      console.log("[Socket] Cleaning up...");
      socket.off();
    };
  }, [roomCode, username, avatar, member, navigate, toast]);

  const handleReady = () => {
    const socket = getSocket();
    if (playerId) {
      console.log("[Action] Send playerReady");
      socket.emit("playerReady", { roomId: roomCode, playerId });
      setPlayerReady(true);
    }
  };

  const handleStartGame = () => {
    const socket = getSocket();
    if (isHost) {
      console.log("[Action] Send startBattle");
      socket.emit("startBattle", { roomId: roomCode });
    }
  };

  return (
    <VStack minH="100vh" justify="center" px={4} bgGradient="linear(to-br, red.50, pink.100)">
      <Box p={8} bg="white" rounded="2xl" shadow="2xl" textAlign="center" maxW="md" w="full">
        <Heading size="sm" color="red.500" mb={2}>
          🎮 Ruang Tantangan 1 vs 1
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          Bagikan kode berikut ke temanmu
        </Text>

        <Badge colorScheme="red" fontSize="2xl" p={3} rounded="full" mb={6}>
          {roomCode}
        </Badge>

        <HStack justify="center" spacing={10} mb={6}>
          <VStack>
            <Avatar size="xl" name={username} src={avatar} />
            <Text fontSize="sm" fontWeight="bold">{username}</Text>
          </VStack>
          
          <Text fontSize="4xl" fontWeight="bold" color="gray.500">VS</Text>

          <VStack>
            {opponent ? (
              <>
                <Avatar size="xl" name={opponent.username} src={opponent.avatar} />
                <Text fontSize="sm" fontWeight="bold">{opponent.username}</Text>
              </>
            ) : (
              <>
                <Avatar size="xl" bg="gray.200" />
                <Text fontSize="sm" color="gray.400">Menunggu...</Text>
              </>
            )}
          </VStack>
        </HStack>

        {!opponent ? (
          <>
            <Spinner size="xl" color="red.400" thickness="4px" />
            <Text mt={4} color="gray.500">Menunggu lawan bergabung...</Text>
          </>
        ) : (
          <>
            {!playerReady ? (
              <Button colorScheme="green" size="lg" w="full" borderRadius="full" onClick={handleReady}>
                ✅ Siap!
              </Button>
            ) : (
              <Text color="green.500" fontWeight="bold" mb={4}>Menunggu lawan siap...</Text>
            )}

            {bothReady && isHost && (
              <Button colorScheme="red" size="lg" w="full" borderRadius="full" onClick={handleStartGame}>
                🚀 Mulai Kuis
              </Button>
            )}
            {bothReady && !isHost && (
              <Text fontSize="sm" color="gray.500">
                Menunggu host mulai kuis...
              </Text>
            )}
          </>
        )}
      </Box>
    </VStack>
  );
};

export default VersusRoom;
