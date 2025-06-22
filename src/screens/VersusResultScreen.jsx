import React, { useState, useEffect, useRef } from "react";
import {
  Box, Button, Center, Heading, Text, VStack, HStack, Badge, Avatar, Flex, useBreakpointValue,
  Input, Divider
} from "@chakra-ui/react";
import { FaTrophy } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { disconnectSocket, getSocket } from "../socket";

const VersusResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const socket = getSocket();

  const searchParams = new URLSearchParams(location.search);
  const yourScore = parseInt(searchParams.get("yourScore") || 0);
  const opponentScore = parseInt(searchParams.get("opponentScore") || 0);
  const totalQuestions = parseInt(searchParams.get("totalQuestions") || 0);
  const yourAvatar = decodeURIComponent(searchParams.get("yourAvatar") || "/images/your-avatar.png");
  const opponentAvatar = decodeURIComponent(searchParams.get("opponentAvatar") || "/images/opponent-avatar.png");
  const roomId = searchParams.get("roomId") || null;

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
      username: "Kamu",
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
    <Center minH="100vh" bgGradient="linear(to-b, pink.50, pink.100)" px={{ base: 3, md: 4 }} position="relative">
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

      {/* Floating Chat Button Mobile */}
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

      {/* Fullscreen Chat Mobile */}
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
    </Center>
  );
};

export default VersusResultScreen;
