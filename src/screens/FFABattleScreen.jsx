import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Text, VStack, Button, Progress, useToast,
  Spinner, CircularProgress, CircularProgressLabel, HStack, Stack, Avatar
} from '@chakra-ui/react';
import { getSocket } from '../socket';

const FFABattleScreen = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const playerId = searchParams.get("playerId") || localStorage.getItem("playerId");

  const [question, setQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const socket = getSocket();

    socket.on("newQuestion", (data) => {
      setQuestion({ text: data.question, options: data.options });
      setQuestionNumber(data.questionNumber);
      setTotalQuestions(data.totalQuestions);
      setSelectedAnswer(null);
      setAnswerResult(null);
      setTimeLeft(15);
    });

    socket.on("answerResult", (result) => setAnswerResult(result));

    socket.on("battleFinished", (result) => {
      toast({ title: "Battle selesai!", status: "success", duration: 1500 });
      navigate(`/ffa-result?roomCode=${roomCode}&result=${encodeURIComponent(JSON.stringify(result))}`);
    });

    socket.on("matchFoundFFA", (data) => {
      setPlayers(data.players);
    });

    return () => {
      socket.off("newQuestion");
      socket.off("answerResult");
      socket.off("battleFinished");
      socket.off("matchFoundFFA");
    };
  }, [navigate, toast, roomCode]);

  useEffect(() => {
    if (!question || selectedAnswer !== null) return;
    if (timeLeft <= 0) {
      handleAnswer("");
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, question, selectedAnswer]);

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answer);
    const socket = getSocket();
    socket.emit("submitAnswer", { roomId: roomCode, playerId, answer });
  };

  const getPlayerName = (pid) => {
    if (pid === playerId) return "Kamu";
    const idx = players.findIndex(p => p.playerId === pid);
    return players[idx] ? players[idx].username : "Pemain";
  };

  return (
    <VStack minH="100vh" justify="center" bg="yellow.50" p={4}>
      {question ? (
        <Box
          bg="white"
          p={{ base: 4, md: 6 }}
          rounded="xl"
          shadow="lg"
          w="full"
          maxW={{ base: "95%", md: "600px" }}
        >
          <HStack justify="space-between" mb={3}>
            <Text fontSize="sm" color="gray.400">
              Soal {questionNumber} dari {totalQuestions}
            </Text>
            <CircularProgress value={(timeLeft / 15) * 100} color="yellow.400" size="50px">
              <CircularProgressLabel fontSize="sm">{timeLeft}s</CircularProgressLabel>
            </CircularProgress>
          </HStack>

          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={4} textAlign="center">
            {question.text}
          </Text>

          <VStack spacing={3}>
            {!answerResult ? (
              question.options.map((opt, idx) => (
                <Button
                  key={idx}
                  colorScheme={selectedAnswer === opt ? "blue" : "gray"}
                  onClick={() => handleAnswer(opt)}
                  w="full"
                  size={{ base: "md", md: "lg" }}
                  isDisabled={selectedAnswer !== null}
                  whiteSpace="normal"
                  textAlign="center"
                >
                  {opt}
                </Button>
              ))
            ) : (
              <VStack spacing={2} w="full">
                {Object.entries(answerResult.answers).map(([pid, res], index) => (
                  <HStack key={pid} w="full" justify="space-between">
                    <Text color={res.isCorrect ? "green.400" : "red.400"}>
                      {getPlayerName(pid)}: {res.answer || "(Tidak menjawab)"}
                    </Text>
                    {index === 0 && res.isCorrect && (
                      <Text fontSize="xs" color="yellow.400" fontWeight="bold">✔️ Paling cepat!</Text>
                    )}
                  </HStack>
                ))}
              </VStack>
            )}
          </VStack>

          {!answerResult && selectedAnswer && (
            <VStack mt={4}>
              <Spinner color="yellow.400" />
              <Text fontSize="sm" color="gray.400">Menunggu jawaban pemain lain...</Text>
            </VStack>
          )}

          <Progress mt={6} value={(questionNumber / totalQuestions) * 100} colorScheme="yellow" size="sm" rounded="full" />
        </Box>
      ) : (
        <Text fontSize="lg" color="yellow.400" fontWeight="bold">Memuat Soal...</Text>
      )}
    </VStack>
  );
};

export default FFABattleScreen;
