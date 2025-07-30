import React, { useEffect, useState, useRef } from "react";
import {
  Box, Button, Center, Heading, VStack, Avatar, Text, Flex,
  useToast, Badge, Select, IconButton, Collapse, HStack, Input, Stack, Circle
} from "@chakra-ui/react";
import { FaCog, FaComments } from "react-icons/fa";
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

  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("normal");
  const [showSettings, setShowSettings] = useState(true);

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
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

      if (data.settings) {
        setQuestionCount(data.settings.questionCount);
        setDifficulty(data.settings.difficulty);
      }
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

    const handleSettingUpdated = (newSettings) => {
      setQuestionCount(newSettings.questionCount);
      setDifficulty(newSettings.difficulty);
      toast({
        title: "Pengaturan diperbarui",
        status: "info",
        duration: 2000,
        isClosable: true
      });
    };

    const handleChatMessage = ({ username, message, avatar }) => {
      setChatMessages(prev => [...prev, { username, message, avatar }].slice(-50));
      if (!isChatOpen) setUnreadCount(prev => prev + 1);
    };

    const resetMatch = () => {
      setIsMatched(false);
      setRoomId(null);
      setPlayerId(null);
      localStorage.clear();
    };

    socket.on("connect", handleConnect);
    socket.on("matchFound", handleMatchFound);
    socket.on("battleStarted", handleBattleStarted);
    socket.on("playerReadyUpdate", handlePlayerReadyUpdate);
    socket.on("opponentLeft", handleOpponentLeft);
    socket.on("settingUpdated", handleSettingUpdated);
    socket.on("chatMessage", handleChatMessage);

    if (socket.connected) handleConnect();
    return () => { socket.off(); };
  }, [username, avatar, member, playerIndex, navigate, playerId, isMatched, isChatOpen]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleLeave = () => {
    socket.emit("leaveRoom", { roomId });
    localStorage.clear();
    window.location.href = "/";
  };
  

  const handleReady = () => {
    setIsMyReady(true);
    socket.emit("playerReady", { roomId, playerId });
  };

  const handleStart = () => {
    socket.emit("startBattle", { roomId });
  };

  const handleUpdateSetting = () => {
    socket.emit("updateSetting", {
      roomId,
      settings: { questionCount, difficulty }
    });
  };

  const sendChat = () => {
    if (chatInput.trim() === "") return;
    socket.emit("chatMessage", { roomId, username, avatar, message: chatInput });
    setChatInput("");
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setUnreadCount(0);
  };

  return (
    <Center minH="100vh" bg="#FFF5F7" px={2} position="relative">
      <Box bg="white" p={{ base: 3, md: 8 }} borderRadius="2xl" shadow="lg" border="2px solid #FBB6CE"
        maxW={{ base: "xs", md: "md" }} w="full" textAlign="center">

        <Heading size="lg" color="pink.500" mb={2}>🎤 JKT48 Quiz Battle</Heading>
        <Badge colorScheme="pink" mb={4}>Room ID: {roomId || "Mencari lawan..."}</Badge>

        <Flex direction={{ base: "column", md: "row" }} justify="center" align="center" mb={6} gap={4}>
          {/* Player Card */}
          <Box bg="pink.50" borderRadius="xl" p={{ base: 2, md: 4 }} border="2px solid #FBB6CE"
            w={{ base: "100px", md: "150px" }}>
            <VStack spacing={2}>
              <Avatar src={player.avatar} size={{ base: "md", md: "xl" }} name={player.name} border="2px solid #F687B3" />
              <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>{player.name}</Text>
              {isMyReady ? (
                <Badge colorScheme="green" px={3} py={1} borderRadius="full">Siap</Badge>
              ) : (
                <Button size="sm" colorScheme="pink" borderRadius="full" onClick={handleReady}>Siap!</Button>
              )}
            </VStack>
          </Box>

          <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="gray.500">VS</Text>

          {/* Opponent Card */}
          <Box bg="pink.50" borderRadius="xl" p={{ base: 2, md: 4 }} border="2px solid #FBB6CE"
            w={{ base: "100px", md: "150px" }}>
            <VStack spacing={2}>
              {opponent.avatar ? (
                <>
                  <Avatar src={opponent.avatar} size={{ base: "md", md: "xl" }} name={opponent.name} />
                  <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>{opponent.name}</Text>
                  <Badge colorScheme={opponentReady ? "green" : "gray"} px={3} py={1} borderRadius="full">
                    {opponentReady ? "Siap" : "Menunggu"}
                  </Badge>
                </>
              ) : (
                <>
                  <Avatar size={{ base: "md", md: "xl" }} name="Menunggu..." />
                  <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }} color="gray.400">Menunggu...</Text>
                </>
              )}
            </VStack>
          </Box>
        </Flex>

        {/* Pengaturan Quiz */}
        <Box p={3} bg="pink.50" borderRadius="md" mb={4} border="1px solid #FBB6CE">
          <Flex justify="center" align="center" mb={2}>
            <Text fontWeight="bold" mr={2}>Pengaturan Quiz</Text>
            <IconButton icon={<FaCog />} size="sm" variant="outline" colorScheme="pink" onClick={() => setShowSettings(!showSettings)} />
          </Flex>

          <Collapse in={showSettings}>
            <VStack spacing={2}>
              <HStack justify="center" w="100%">
                <Text minW="90px" fontSize={{ base: "sm", md: "md" }}>Jumlah Soal:</Text>
                <Select value={questionCount} onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                  maxW="100px" size="sm" isDisabled={!isHost}>
                  {[5, 10, 15, 20].map(num => <option key={num} value={num}>{num}</option>)}
                </Select>
              </HStack>

              <HStack justify="center" w="100%">
                <Text minW="90px" fontSize={{ base: "sm", md: "md" }}>Kesulitan:</Text>
                <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
                  maxW="100px" size="sm" isDisabled={!isHost}>
                  <option value="mudah">Easy</option>
                  <option value="sedang">Normal</option>
                  <option value="sulit">Hard</option>
                </Select>
              </HStack>

              {isHost && (
                <Button colorScheme="blue" size="sm" onClick={handleUpdateSetting}>Update</Button>
              )}
            </VStack>
          </Collapse>
        </Box>

        <VStack spacing={3}>
          <Button colorScheme="blue" size="sm" onClick={handleLeave}>🏠 Kembali</Button>
          {isHost && (
            <Button colorScheme="green" size="lg" borderRadius="full"
              isDisabled={!isMyReady || !opponentReady} onClick={handleStart}>
              🚀 Mulai Quiz!
            </Button>
          )}
        </VStack>
      </Box>

      {/* Floating Chat */}
      <Box position="absolute" bottom="5" right="5">
        <IconButton icon={<FaComments />} colorScheme="pink" size="lg" borderRadius="full" onClick={toggleChat} />
        {unreadCount > 0 && (
          <Circle size="5" bg="red.400" color="white" fontSize="xs" position="absolute" top="0" right="0">{unreadCount}</Circle>
        )}
      </Box>

      {isChatOpen && (
        <Box position="absolute" bottom="20" right="5" bg="white" border="2px solid #FBB6CE"
          borderRadius="lg" p={3} w="260px" maxH="400px" shadow="lg">
          <Text fontWeight="bold" mb={2}>Chat Room</Text>
          <Box overflowY="auto" maxH="250px" ref={chatBoxRef}>
            {chatMessages.map((msg, idx) => (
              <HStack key={idx} align="start" mb={2}>
                <Avatar size="xs" src={msg.avatar} name={msg.username} />
                <Box><Text fontWeight="bold" fontSize="sm">{msg.username}</Text><Text fontSize="sm">{msg.message}</Text></Box>
              </HStack>
            ))}
          </Box>
          <HStack mt={2}>
            <Input size="sm" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} />
            <Button size="sm" colorScheme="pink" onClick={sendChat}>Kirim</Button>
          </HStack>
        </Box>
      )}
    </Center>
  );
};

export default VersusScreen;
