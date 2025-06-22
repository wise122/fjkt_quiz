import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Heading, Text, VStack, Spinner, Button, useToast, Badge, Avatar, HStack, Input, Divider
} from '@chakra-ui/react';
import { getSocket, connectSocket } from '../socket';

const VersusRoom = () => {
  const { roomCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();;
  const [unreadCount, setUnreadCount] = useState(0);

  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username") || "Kamu";
  const avatar = decodeURIComponent(searchParams.get("avatar") || "");
  const member = searchParams.get("member") || "";

  const [opponent, setOpponent] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [bothReady, setBothReady] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    connectSocket("manual");
    const socket = getSocket();

    socket.emit("joinRoom", { roomCode, username, avatar, member });

    socket.on("joinedRoom", (data) => {
      setPlayerId(data.playerId);
      setIsHost(data.isHost);
      localStorage.setItem("playerId", data.playerId);
    });

    socket.on("matchFound", (data) => {
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
      if (playerCount === 2) {
        toast({ title: "Lawan sudah masuk", status: "info", duration: 1500, isClosable: true });
      }
    });

    socket.on("playerReadyUpdate", ({ player1Ready, player2Ready }) => {
      const both = player1Ready && player2Ready;
      setBothReady(both);
    });

    socket.on("opponentLeft", () => {
      toast({ title: "Lawan keluar", status: "warning", duration: 2000, isClosable: true });
      navigate("/");
    });

    socket.on("battleStarted", ({ roomId }) => {
      const savedPlayerId = localStorage.getItem("playerId");
      navigate(`/versus/battle/${roomId}?playerId=${savedPlayerId}`);
    });

    socket.on("chatMessage", ({ username, message, avatar }) => {
      setChatMessages(prev => [...prev, { username, message, avatar }].slice(-50));
      if (!isChatOpen) setUnreadCount(prev => prev + 1);
    });
    

    return () => { socket.off(); };
  }, [roomCode, username, avatar, member, navigate, toast]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleReady = () => {
    const socket = getSocket();
    if (playerId) {
      socket.emit("playerReady", { roomId: roomCode, playerId });
      setPlayerReady(true);
    }
  };

  const openChat = () => {
    setIsChatOpen(true);
    setUnreadCount(0);
  };
  

  const handleStartGame = () => {
    const socket = getSocket();
    if (isHost) {
      socket.emit("startBattle", { roomId: roomCode });
    }
  };

  const handleSendChat = () => {
    if (chatInput.trim() === "") return;
    const socket = getSocket();
    socket.emit("chatMessage", { roomId: roomCode, username, avatar, message: chatInput });
    setChatInput("");
  };

  return (
    <VStack minH="100vh" justify="center" px={4} bgGradient="linear(to-br, red.50, pink.100)">
      <Box p={8} bg="white" rounded="2xl" shadow="2xl" textAlign="center" maxW="md" w="full">
        <Heading size="sm" color="red.500" mb={2}>🎮 Ruang Tantangan 1 vs 1</Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>Bagikan kode berikut ke temanmu</Text>

        <Badge colorScheme="red" fontSize="2xl" p={3} rounded="full" mb={6}>{roomCode}</Badge>

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
              <Text fontSize="sm" color="gray.500">Menunggu host mulai kuis...</Text>
            )}
          </>
        )}
      </Box>

      {/* Floating Chat Button - only on mobile */}
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


      {/* Floating Chat Box Mobile */}
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
    </VStack>
  );
};

export default VersusRoom;
