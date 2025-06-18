import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box, Heading, VStack, Text, Button, Progress, Center,
  HStack, Badge, useToast, Spinner
} from "@chakra-ui/react";
import { FaClock, FaStar, FaQuestionCircle } from "react-icons/fa";
import io from "socket.io-client";

const socket = io("https://q.sfinbusinesssolution.net"); // ✅ Ganti ke server kamu

const BattleScreen = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  const roomId = searchParams.get("roomId");
  const playerId = searchParams.get("playerId");

  const [question, setQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId || !playerId) {
      navigate("/");
    }
  }, [roomId, playerId, navigate]);

  useEffect(() => {
    if (roomId && playerId) {
      socket.emit("readyToStart", { roomId, playerId });
    }
  }, [roomId, playerId]);

  useEffect(() => {
    const handleNewQuestion = (data) => {
      setQuestion(data.question);
      setQuestionNumber(data.currentNumber);
      setTotalQuestions(data.totalQuestions);
      setTimeLeft(15);
      setSelected(null);
      setLoading(false);
    };

    const handleAnswerResult = ({ playerId: answeredId, correct }) => {
      if (answeredId === playerId) {
        if (correct) {
          setScore(prev => prev + 1);
          toast({
            title: "Benar!",
            description: "Kamu mendapatkan 1 poin!",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Salah!",
            description: "Jawaban kamu salah.",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
        }
      }
    };

    const handleBattleFinished = ({ scores }) => {
      const myScore = scores[playerId] || 0;
      navigate(`/result?roomId=${roomId}&playerId=${playerId}&score=${myScore}`);
    };

    socket.on("newQuestion", handleNewQuestion);
    socket.on("answerResult", handleAnswerResult);
    socket.on("battleFinished", handleBattleFinished);

    return () => {
      socket.off("newQuestion", handleNewQuestion);
      socket.off("answerResult", handleAnswerResult);
      socket.off("battleFinished", handleBattleFinished);
    };
  }, [playerId, roomId, navigate, toast]);

  useEffect(() => {
    if (timeLeft === 0 && selected === null) {
      handleAnswer(null);
    }
  }, [timeLeft, selected]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (option) => {
    if (selected !== null) return;
    setSelected(option);
    socket.emit("submitAnswer", { roomId, playerId, answer: option });
  };

  if (loading) {
    return (
      <Center minH="100vh" bgGradient="linear(to-br, pink.50, pink.100)">
        <Spinner size="xl" color="pink.400" />
        <Text mt={3}>Menunggu pertanyaan...</Text>
      </Center>
    );
  }

  return (
    <Center minH="100vh" bgGradient="linear(to-br, pink.50, pink.100)" px={4}>
      <Box bg="white" p={8} borderRadius="2xl" shadow="xl" w="full" maxW="lg" textAlign="center" border="3px solid" borderColor="pink.300" position="relative">
        <Badge position="absolute" top={4} right={4} colorScheme="pink">
          Room: {roomId}
        </Badge>

        <Heading size="lg" mb={3} color="pink.500" display="flex" alignItems="center" justifyContent="center">
          <FaQuestionCircle style={{ marginRight: "8px" }} />
          JKT48 Quiz Battle
        </Heading>

        <Progress value={(questionNumber / totalQuestions) * 100} colorScheme="pink" mb={4} borderRadius="full" height="8px" />

        <Box bg="pink.50" p={5} rounded="xl" mb={4} border="1px solid pink">
          <Text fontSize="md" color="gray.500">Soal {questionNumber} dari {totalQuestions}</Text>
          <Text fontSize="xl" fontWeight="bold" mt={2}>{question.text}</Text>
        </Box>

        <VStack spacing={3}>
          {question.options.map((opt, index) => (
            <Button
              key={index}
              size="lg"
              colorScheme={selected === opt ? "pink" : "gray"}
              variant={selected === opt ? "solid" : "outline"}
              w="full"
              onClick={() => handleAnswer(opt)}
              isDisabled={selected !== null}
            >
              {opt}
            </Button>
          ))}
        </VStack>

        <HStack mt={6} justify="space-between">
          <HStack><FaClock color="gray" /><Text>{timeLeft} detik</Text></HStack>
          <HStack><FaStar color="gold" /><Text>{score} Poin</Text></HStack>
        </HStack>
      </Box>
    </Center>
  );
};

export default BattleScreen;
