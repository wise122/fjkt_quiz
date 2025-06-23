import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Heading, Text, VStack, Button, useToast, Badge, Avatar, HStack,
  Input, Flex, IconButton, Circle, Select, Collapse
} from '@chakra-ui/react';
import { getSocket, connectSocket } from '../socket';
import { FaComments, FaCog } from 'react-icons/fa';

const VersusRoom = () => {
  const { roomCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const chatBoxRef = useRef(null);

  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username") || "Kamu";
  const avatar = decodeURIComponent(searchParams.get("avatar") || "");
  const member = searchParams.get("member") || "";

  const [playerId, setPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [bothReady, setBothReady] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("normal");
  const [showSettings, setShowSettings] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    connectSocket("manual");
    const socket = getSocket();

    socket.emit("joinRoom", { roomCode, username, avatar, member });

    socket.on("joinedRoom", (data) => {
      setPlayerId(data.playerId);
      setIsHost(data.isHost);
      localStorage.setItem("playerId", data.playerId);
      if (data.settings) {
        setQuestionCount(data.settings.questionCount);
        setDifficulty(data.settings.difficulty);
      }
    });

    socket.on("matchFound", (data) => {
      setPlayerId(data.playerId);
      setIsHost(data.isHost);
      if (data.opponentName) {
        setOpponent({ username: data.opponentName, avatar: data.opponentAvatar });
      }
      if (data.settings) {
        setQuestionCount(data.settings.questionCount);
        setDifficulty(data.settings.difficulty);
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

    socket.on("settingUpdated", (newSettings) => {
      setQuestionCount(newSettings.questionCount);
      setDifficulty(newSettings.difficulty);
      toast({ title: "Pengaturan diperbarui", status: "info", duration: 1500 });
    });

    socket.on("opponentLeft", () => {
      toast({ title: "Lawan keluar", status: "warning", duration: 2000, isClosable: true });
      setOpponent(null);
      setBothReady(false);
      navigate("/"); 
    });

    socket.on("battleStarted", ({ roomId }) => {
      const savedPlayerId = localStorage.getItem("playerId");
      navigate(`/versus/battle/${roomId}?playerId=${savedPlayerId}`);
    });

    socket.on("chatMessage", ({ username: senderName, message, avatar }) => {
      setChatMessages(prev => [...prev, { username: senderName, message, avatar }].slice(-50));
      if (!isChatOpen && senderName !== username) {
        setUnreadCount(prev => prev + 1);
      }
    });

    return () => socket.off();
  }, [roomCode, username, avatar, member, navigate, toast, isChatOpen]);

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

  const handleStartGame = () => {
    const socket = getSocket();
    if (isHost) {
      socket.emit("startBattle", { roomId: roomCode });
    }
  };

  const handleUpdateSetting = () => {
    const socket = getSocket();
    socket.emit("updateSetting", {
      roomId: roomCode,
      settings: { questionCount, difficulty }
    });
  };

  const handleSendChat = () => {
    if (chatInput.trim() === "") return;
    const socket = getSocket();
    socket.emit("chatMessage", { roomId: roomCode, username, avatar, message: chatInput });
    setChatInput("");
  };

  const handleLeaveRoom = () => {
    const socket = getSocket();
    socket.emit("leaveRoom", { roomId: roomCode });
    localStorage.clear(); // Clear semua data
    navigate("/"); // Balik ke home, bersih total
  };

  return (
    <Flex minH="100vh" bg="#FFF5F7" justify="center" align="center" position="relative">
      <Box bg="white" p={{ base: 4, md: 8 }} borderRadius="2xl" shadow="xl" border="2px solid #FBB6CE" maxW="md" w="full">
        <VStack mb={4}>
          <Heading size="lg" color="pink.500" mb={1}>🎮 Duel Quiz 1 vs 1</Heading>
          <Badge colorScheme="pink" fontSize="md" px={3} py={2} borderRadius="full">{roomCode}</Badge>
        </VStack>

        <Flex justify="center" align="center" gap={6} mb={6}>
          <Box bg="pink.50" border="2px solid #FBB6CE" borderRadius="xl" p={3} w="120px">
            <VStack>
              <Avatar src={avatar} name={username} size="xl" border="2px solid #F687B3" />
              <Text fontWeight="bold" fontSize="md">{username}</Text>
              {playerReady ? (
                <Badge colorScheme="green" px={3} py={1} borderRadius="full">Siap</Badge>
              ) : (
                <Button size="sm" colorScheme="pink" borderRadius="full" onClick={handleReady}>Siap!</Button>
              )}
            </VStack>
          </Box>

          <Text fontSize="3xl" fontWeight="bold" color="gray.500">VS</Text>

          <Box bg="pink.50" border="2px solid #FBB6CE" borderRadius="xl" p={3} w="120px">
            <VStack>
              {opponent ? (
                <>
                  <Avatar src={opponent.avatar} name={opponent.username} size="xl" border="2px solid #F687B3" />
                  <Text fontWeight="bold" fontSize="md">{opponent.username}</Text>
                  <Badge colorScheme={bothReady ? "green" : "gray"} px={3} py={1} borderRadius="full">
                    {bothReady ? "Siap" : "Menunggu"}
                  </Badge>
                </>
              ) : (
                <>
                  <Avatar size="xl" bg="gray.300" />
                  <Text fontWeight="bold" fontSize="md" color="gray.400">Menunggu...</Text>
                </>
              )}
            </VStack>
          </Box>
        </Flex>

        <Box bg="pink.50" border="1px solid #FBB6CE" p={3} borderRadius="md" mb={4}>
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontWeight="bold">Pengaturan Quiz</Text>
            <IconButton icon={<FaCog />} size="sm" variant="outline" colorScheme="pink" onClick={() => setShowSettings(!showSettings)} />
          </Flex>
          <Collapse in={showSettings}>
            <VStack spacing={2}>
              <HStack justify="space-between">
                <Text>Jumlah Soal:</Text>
                <Select value={questionCount} onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                  size="sm" maxW="100px" isDisabled={!isHost}>
                  {[5, 10, 15, 20].map(n => (<option key={n} value={n}>{n}</option>))}
                </Select>
              </HStack>
              <HStack justify="space-between">
                <Text>Kesulitan:</Text>
                <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
                  size="sm" maxW="100px" isDisabled={!isHost}>
                  <option value="mudah">Easy</option>
                  <option value="normal">Normal</option>
                  <option value="sulit">Hard</option>
                </Select>
              </HStack>
              {isHost && (
                <Button size="sm" colorScheme="blue" onClick={handleUpdateSetting}>Update</Button>
              )}
            </VStack>
          </Collapse>
        </Box>

        <VStack spacing={3}>
          <Button size="sm" colorScheme="gray" variant="outline" mb={4} onClick={handleLeaveRoom}>
            ⬅ Kembali ke Main Menu
          </Button>
          {bothReady && isHost && (
            <Button colorScheme="green" size="lg" borderRadius="full" onClick={handleStartGame}>
              🚀 Mulai Quiz!
            </Button>
          )}
          {!bothReady && opponent && playerReady && (
            <Text fontSize="sm" color="gray.500">Menunggu lawan siap...</Text>
          )}
        </VStack>
      </Box>

      <Box position="absolute" bottom={5} right={5}>
        <IconButton icon={<FaComments />} colorScheme="pink" size="lg" borderRadius="full"
          onClick={() => {
            setIsChatOpen(prev => {
              const newState = !prev;
              if (!prev) setUnreadCount(0);
              return newState;
            });
          }} />
        {unreadCount > 0 && (
          <Circle size="5" bg="red.400" color="white" fontSize="xs" position="absolute" top="-1" right="-1">
            {unreadCount}
          </Circle>
        )}
      </Box>

      {isChatOpen && (
        <Box position="absolute" bottom="20" right="5" bg="white" border="2px solid #FBB6CE" borderRadius="lg" p={3} w="260px" maxH="400px" shadow="lg">
          <Text fontWeight="bold" mb={2}>Chat Room</Text>
          <Box overflowY="auto" maxH="250px" ref={chatBoxRef}>
            {chatMessages.map((msg, idx) => (
              <HStack key={idx} align="start" mb={2}>
                <Avatar size="xs" src={msg.avatar} name={msg.username} />
                <Box>
                  <Text fontWeight="bold" fontSize="sm">{msg.username}</Text>
                  <Text fontSize="sm">{msg.message}</Text>
                </Box>
              </HStack>
            ))}
          </Box>
          <HStack mt={2}>
            <Input size="sm" value={chatInput} onChange={(e) => setChatInput(e.target.value)} 
              onKeyDown={(e) => e.key === "Enter" && handleSendChat()} />
            <Button size="sm" colorScheme="pink" onClick={handleSendChat}>Kirim</Button>
          </HStack>
        </Box>
      )}
    </Flex>
  );
};

export default VersusRoom;
