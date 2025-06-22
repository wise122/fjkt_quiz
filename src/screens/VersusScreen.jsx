import React, { useEffect, useState, useRef } from "react";
import {
  Box, Button, Center, Heading, VStack, Avatar, Text, Flex,
  useToast, Divider, HStack, Input, Badge
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

  // Chat related
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatBoxRef = useRef(null);

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

    const handleChatMessage = ({ username, message, avatar }) => {
      setChatMessages(prev => [...prev, { username, message, avatar }].slice(-50));
      if (!isChatOpen) setUnreadCount(prev => prev + 1);
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
    socket.on("chatMessage", handleChatMessage);

    if (socket.connected) handleConnect();

    return () => {
      socket.off();
    };
  }, [username, avatar, member, playerIndex, navigate, playerId, isMatched, isChatOpen]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

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

  const handleSendChat = () => {
    if (chatInput.trim() === "") return;
    socket.emit("chatMessage", { roomId, username, avatar, message: chatInput });
    setChatInput("");
  };

  const openChat = () => {
    setIsChatOpen(true);
    setUnreadCount(0);
  };

  return (
    <Center minH="100vh" bg="#FFF5F7" px={4} position="relative">
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

        <Flex direction={{ base: "column", md: "row" }} justify="center" align="center" mb={4} gap={{ base: 4, md: 8 }}>
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

      {/* Floating Chat Button - mobile */}
      <Box position="fixed" bottom={4} right={4} zIndex={999} display={{ base: "block", md: "none" }}>
        <Button colorScheme="pink" borderRadius="full" boxSize="60px" onClick={openChat} position="relative">
          💬
          {unreadCount > 0 && (
            <Box
              position="absolute"
              top="-5px"
              right="-5px"
              bg="red.500"
              color="white"
              fontSize="xs"
              fontWeight="bold"
              px={2}
              py={1}
              borderRadius="full"
            >
              {unreadCount}
            </Box>
          )}
        </Button>
      </Box>

      {/* Full screen chat on mobile */}
      {isChatOpen && (
        <Box position="fixed" bottom={0} left={0} right={0} top={0} bg="white" zIndex={1000} p={3} display="flex" flexDirection="column">
          <HStack justify="space-between" mb={2}>
            <Heading size="sm" color="pink.500">Live Chat</Heading>
            <Button size="sm" onClick={() => setIsChatOpen(false)}>Tutup</Button>
          </HStack>
          <Divider mb={2} />

          <VStack ref={chatBoxRef} align="stretch" spacing={2} overflowY="auto" flex="1">
            {chatMessages.map((msg, idx) => (
              <HStack key={idx} align="start">
                <Avatar size="xs" src={msg.avatar} name={msg.username} />
                <Box>
                  <Text fontSize="xs" fontWeight="bold">{msg.username}</Text>
                  <Text fontSize="sm">{msg.message}</Text>
                </Box>
              </HStack>
            ))}
          </VStack>

          <HStack mt={2}>
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Chat..."
              size="sm"
              bg="pink.50"
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendChat(); }}
            />
            <Button size="sm" colorScheme="pink" onClick={handleSendChat}>Send</Button>
          </HStack>
        </Box>
      )}

      {/* Chat Box Desktop */}
      <Box
        position="absolute"
        bottom={{ base: 4, md: 8 }}
        right={{ base: 4, md: 8 }}
        w="300px"
        bg="white"
        border="2px solid #FBB6CE"
        borderRadius="lg"
        shadow="lg"
        p={3}
        display={{ base: "none", md: "flex" }}
        flexDirection="column"
        height="400px"
      >
        <VStack ref={chatBoxRef} align="stretch" spacing={2} overflowY="auto" flex="1">
          {chatMessages.map((msg, idx) => (
            <HStack key={idx} align="start">
              <Avatar size="xs" src={msg.avatar} name={msg.username} />
              <Box>
                <Text fontSize="xs" fontWeight="bold">{msg.username}</Text>
                <Text fontSize="sm">{msg.message}</Text>
              </Box>
            </HStack>
          ))}
        </VStack>

        <HStack mt={2}>
          <Input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Chat..."
            size="sm"
            bg="pink.50"
            onKeyDown={(e) => { if (e.key === 'Enter') handleSendChat(); }}
          />
          <Button size="sm" colorScheme="pink" onClick={handleSendChat}>Send</Button>
        </HStack>
      </Box>
    </Center>
  );
};

export default VersusScreen;
