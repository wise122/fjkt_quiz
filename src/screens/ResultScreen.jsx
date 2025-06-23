import React, { useState, useEffect, useRef } from "react";
import {
  Box, Button, Center, Heading, Text, VStack, Avatar, Flex, Badge,
  HStack, Input, Divider
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { disconnectSocket, getSocket } from "../socket";

const ResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const socket = getSocket();

  const {
    yourScore = 0,
    opponentScore = 0,
    yourAvatar = "/images/your-avatar.png",
    opponentAvatar = "/images/opponent-avatar.png",
    yourUsername = "Kamu",
    opponentUsername = "Lawan",
    roomId = null
  } = location.state || {};

  const handlePlayAgain = () => {
    disconnectSocket();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  const isWinner = yourScore > opponentScore;
  const isDraw = yourScore === opponentScore;

  // Chat states
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    socket.on("chatMessage", ({ username, message, avatar }) => {
      setChatMessages(prev => [...prev, { username, message, avatar }].slice(-50));
      if (!isChatOpen) setUnreadCount(prev => prev + 1);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [socket, isChatOpen]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendChat = () => {
    if (chatInput.trim() === "") return;
    socket.emit("chatMessage", {
      roomId,
      username: yourUsername,
      avatar: yourAvatar,
      message: chatInput
    });
    setChatInput("");
  };

  const openChat = () => {
    setIsChatOpen(true);
    setUnreadCount(0);
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, #FFDEE9, #B5FFFC)"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={4}
      position="relative"
    >
      <VStack spacing={6} w="full" maxW="400px" textAlign="center">
        <Heading fontSize="2xl" color="pink.500">🎉 Hasil Pertandingan</Heading>
        <Text fontSize="6xl">
          {isDraw ? "🤝" : isWinner ? "🏆" : "😢"}
        </Text>

        <Flex justify="center" align="center" w="full" gap={4}>
          <VStack>
            <Avatar src={yourAvatar} size="2xl" borderWidth="4px" borderColor="pink.400" />
            <Text fontWeight="bold" fontSize="lg" color="pink.600">{yourUsername}</Text>
            <Text fontSize="4xl" color="pink.500">{yourScore}</Text>
          </VStack>

          <Text fontSize="3xl" fontWeight="bold" color="gray.500">VS</Text>

          <VStack>
            <Avatar src={opponentAvatar} size="2xl" borderWidth="4px" borderColor="blue.400" />
            <Text fontWeight="bold" fontSize="lg" color="blue.600">{opponentUsername}</Text>
            <Text fontSize="4xl" color="blue.500">{opponentScore}</Text>
          </VStack>
        </Flex>

        <Badge
          colorScheme={isDraw ? "yellow" : isWinner ? "green" : "red"}
          fontSize="lg"
          px={6}
          py={3}
          borderRadius="full"
        >
          {isDraw ? "🤝 Seri!" : isWinner ? "🏆 Kamu Menang!" : "😢 Kamu Kalah"}
        </Badge>

        <Button colorScheme="pink" size="lg" borderRadius="full" w="full" onClick={handlePlayAgain}>
          🔄 Main Lagi
        </Button>
      </VStack>

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
        <Box position="fixed" top={0} bottom={0} left={0} right={0} bg="white" zIndex={1000} p={3} display="flex" flexDirection="column">
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
    </Box>
  );
};

export default ResultScreen;
