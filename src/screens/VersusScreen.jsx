import React, { useEffect, useState } from "react";
import {
  Box, Button, Center, Heading, VStack, Avatar, Text, HStack,
  useToast, Divider
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("https://q.sfinbusinesssolution.net");

const VersusScreen = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const avatar = searchParams.get("avatar");
  const member = searchParams.get("member");

  const [roomId, setRoomId] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [playerIndex, setPlayerIndex] = useState(null);

  const [player, setPlayer] = useState({ name: username, avatar, member });
  const [opponent, setOpponent] = useState({ name: "", avatar: "", member: "" });

  const [isMyReady, setIsMyReady] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);

  useEffect(() => {
    if (!username) return;

    socket.emit("findMatch", { username, avatar, member });

    socket.on("battleStarted", ({ roomId }) => {
      console.log("🔥 Battle started, navigating to battle screen");
      navigate(`/battle?roomId=${roomId}&playerId=${playerId}`);
    });

    socket.on("matchFound", (data) => {
      setRoomId(data.roomId);
      setPlayerId(data.playerId);
      setIsHost(data.isHost);
      setPlayerIndex(data.playerIndex);
      setPlayer({ name: data.playerName, avatar: data.playerAvatar, member: data.playerMember });
      setOpponent({ name: data.opponentName, avatar: data.opponentAvatar, member: data.opponentMember });
    });

    socket.on("playerReadyUpdate", ({ player1Ready, player2Ready }) => {
      if (playerIndex === 0) {
        setIsMyReady(player1Ready);
        setOpponentReady(player2Ready);
      } else {
        setIsMyReady(player2Ready);
        setOpponentReady(player1Ready);
      }
    });

    socket.on("opponentLeft", () => {
      setOpponent({ name: "", avatar: "", member: "" });
      setOpponentReady(false);
      toast({
        title: "Lawan keluar",
        description: "Lawan kamu meninggalkan pertandingan.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    });

    return () => {
      socket.off("matchFound");
      socket.off("battleStarted");
      socket.off("playerReadyUpdate");
      socket.off("opponentLeft");
    };
  }, [username, avatar, member, playerIndex, toast]);

  const handleReady = () => {
    setIsMyReady(true);
    socket.emit("playerReady", { roomId, playerId });
  };

  const handleStart = () => {
    console.log("🚀 Host starting battle");
    socket.emit("startBattle", { roomId });
  };

  return (
    <Center minH="100vh" bg="#FFF5F7" px={4}>
      <Box bg="white" p={8} borderRadius="xl" shadow="md" border="2px solid #FBB6CE" maxW="md" w="full" textAlign="center">
        <Heading size="md" color="pink.500" mb={1}>🎤 JKT48 Quiz Battle</Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          Room ID: <strong>{roomId || "Mencari lawan..."}</strong>
        </Text>

        <HStack spacing={8} justify="center" mb={4}>
          <VStack spacing={2}>
            <Avatar src={player.avatar} size="xl" name={player.name} border="2px solid #F687B3" />
            <Text fontWeight="bold" fontSize="sm">{player.name}</Text>
            {isMyReady ? (
              <Button size="sm" leftIcon={<FaCheckCircle />} colorScheme="green" borderRadius="full" px={6} isDisabled>Siap</Button>
            ) : (
              <Button size="sm" colorScheme="pink" borderRadius="full" px={6} onClick={handleReady}>Siap!</Button>
            )}
          </VStack>

          <Text fontSize="2xl" color="gray.600">VS</Text>

          <VStack spacing={2}>
            {opponent.avatar ? (
              <>
                <Avatar src={opponent.avatar} size="xl" name={opponent.name} />
                <Text fontWeight="bold" fontSize="sm">{opponent.name}</Text>
                <Button size="sm" variant="outline" colorScheme={opponentReady ? "green" : "gray"} borderRadius="full" px={6} isDisabled>
                  {opponentReady ? "Siap" : "Menunggu siap..."}
                </Button>
              </>
            ) : (
              <>
                <Avatar size="xl" name="Menunggu..." />
                <Text fontWeight="bold" fontSize="sm" color="gray.400">Menunggu lawan...</Text>
              </>
            )}
          </VStack>
        </HStack>

        <Divider my={4} />
        <Text fontSize="sm" color="gray.500" mb={4}>
          Tekan tombol <strong>“Siap!”</strong> jika kamu sudah siap bertanding~
        </Text>

        <VStack spacing={3}>
          <Button colorScheme="blue" onClick={() => {
            socket.emit("leaveRoom", { roomId });
            window.location.href = "/";
          }}>
            🏠 Kembali ke Beranda
          </Button>

          {isHost && (
            <Button colorScheme="green" isDisabled={!isMyReady || !opponentReady} onClick={handleStart}>
              🚀 Mulai!
            </Button>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default VersusScreen;
