import React, { useEffect, useState } from "react";
import {
  Box, Button, Center, Heading, VStack, Avatar, Text, Flex,
  useToast, Divider
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getSocket } from "../socket";

const VersusScreen = () => {
  const socket = getSocket();
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const avatar = searchParams.get("avatar");
  const member = searchParams.get("member");

  const [roomId, setRoomId] = useState(localStorage.getItem("roomId") || null);
  const [playerId, setPlayerId] = useState(localStorage.getItem("playerId") || null);
  const [isHost, setIsHost] = useState(false);
  const [playerIndex, setPlayerIndex] = useState(null);
  const [player, setPlayer] = useState({ name: username, avatar, member });
  const [opponent, setOpponent] = useState({ name: "", avatar: "", member: "" });
  const [isMyReady, setIsMyReady] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);
  const [isMatched, setIsMatched] = useState(localStorage.getItem("isMatched") === "true");

  useEffect(() => {
    if (!username) return;

    const handleConnect = () => {
      const storedPlayerId = localStorage.getItem("playerId");
      if (storedPlayerId) {
        socket.emit("resumeSession", { previousPlayerId: storedPlayerId });
      } else {
        socket.emit("findMatch", { username, avatar, member });
      }
    };

    const handleMatchFound = (data) => {
      setIsMatched(true);
      localStorage.setItem("isMatched", "true");
      setRoomId(data.roomId);
      setPlayerId(data.playerId);
      localStorage.setItem("playerId", data.playerId);
      setIsHost(data.isHost);
      setPlayerIndex(data.playerIndex);
      setPlayer({ name: data.playerName, avatar: data.playerAvatar, member: data.playerMember });
      setOpponent({ name: data.opponentName, avatar: data.opponentAvatar, member: data.opponentMember });
    };

    const handleBattleStarted = ({ roomId }) => {
      navigate(`/battle?roomId=${roomId}&playerId=${playerId}`);
    };

    const handlePlayerReadyUpdate = ({ player1Ready, player2Ready }) => {
      if (playerIndex === 0) {
        setIsMyReady(player1Ready);
        setOpponentReady(player2Ready);
      } else {
        setIsMyReady(player2Ready);
        setOpponentReady(player1Ready);
      }
    };

    const handleOpponentLeft = () => {
      setOpponent({ name: "", avatar: "", member: "" });
      setOpponentReady(false);
      toast({
        title: "Lawan keluar",
        description: "Lawan kamu meninggalkan pertandingan.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      resetMatch();
    };

    const resetMatch = () => {
      setIsMatched(false);
      setRoomId(null);
      setPlayerId(null);
      localStorage.removeItem("isMatched");
      localStorage.removeItem("roomId");
      localStorage.removeItem("playerId");
    };

    socket.on("connect", handleConnect);
    socket.on("matchFound", handleMatchFound);
    socket.on("battleStarted", handleBattleStarted);
    socket.on("playerReadyUpdate", handlePlayerReadyUpdate);
    socket.on("opponentLeft", handleOpponentLeft);

    if (socket.connected) handleConnect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("matchFound", handleMatchFound);
      socket.off("battleStarted", handleBattleStarted);
      socket.off("playerReadyUpdate", handlePlayerReadyUpdate);
      socket.off("opponentLeft", handleOpponentLeft);
    };
  }, [username, avatar, member, playerIndex, toast, navigate, playerId, isMatched, socket]);

  const handleReady = () => {
    setIsMyReady(true);
    socket.emit("playerReady", { roomId, playerId });
  };

  const handleStart = () => {
    socket.emit("startBattle", { roomId });
  };

  const handleLeave = () => {
    socket.emit("leaveRoom", { roomId });
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Center minH="100vh" bg="#FFF5F7" px={4}>
      <Box
        bg="white"
        p={{ base: 4, md: 8 }}
        borderRadius="xl"
        shadow="md"
        border="2px solid #FBB6CE"
        maxW={{ base: "95%", md: "md" }}
        w="full"
        textAlign="center"
      >
        <Heading size="md" color="pink.500" mb={1}>🎤 JKT48 Quiz Battle</Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          Room ID: <strong>{roomId || "Mencari lawan..."}</strong>
        </Text>

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="center"
          align="center"
          mb={4}
          gap={{ base: 4, md: 8 }}
        >
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
        </Flex>

        <Divider my={4} />
        <Text fontSize="sm" color="gray.500" mb={4}>
          Tekan tombol <strong>“Siap!”</strong> jika kamu sudah siap bertanding~
        </Text>

        <VStack spacing={3}>
          <Button colorScheme="blue" onClick={handleLeave}>🏠 Kembali ke Beranda</Button>
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
