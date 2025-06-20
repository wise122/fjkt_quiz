import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Text, VStack, Button, Progress, useToast, Spinner,
  CircularProgress, CircularProgressLabel, HStack, Image
} from '@chakra-ui/react';
import { getSocket } from '../socket';

const VersusBattleScreen = () => {
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

  useEffect(() => {
    const socket = getSocket();

    socket.on("newQuestion", (data) => {
      console.log("[Socket] newQuestion", data);
      setQuestion(data);
      setQuestionNumber(data.questionNumber);
      setTotalQuestions(data.totalQuestions);
      setSelectedAnswer(null);
      setAnswerResult(null);
      setTimeLeft(15);
    });

    socket.on("answerResult", (result) => {
      console.log("[Socket] answerResult", result);
      setAnswerResult(result);
    });

    socket.on("battleFinished", (result) => {
      console.log("[Socket] battleFinished", result);
      toast({ title: "Battle selesai!", status: "success", duration: 1500 });
      const { yourScore, opponentScore, totalQuestions, yourAvatar, opponentAvatar } = result;
      navigate(
        `/versus-result?yourScore=${yourScore}&opponentScore=${opponentScore}&totalQuestions=${totalQuestions}&yourAvatar=${encodeURIComponent(yourAvatar)}&opponentAvatar=${encodeURIComponent(opponentAvatar)}`
      );
    });

    socket.on("opponentLeft", () => {
      console.warn("[Socket] opponentLeft");
      toast({ title: "Lawan keluar", status: "warning", duration: 2000 });
      navigate("/");
    });

    return () => {
      socket.off("newQuestion");
      socket.off("answerResult");
      socket.off("battleFinished");
      socket.off("opponentLeft");
    };
  }, [navigate, toast]);

  useEffect(() => {
    if (!question || selectedAnswer !== null) return;
    if (timeLeft <= 0) {
      handleAnswer("");
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, question, selectedAnswer]);

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answer);
    const socket = getSocket();
    socket.emit("submitAnswer", { roomId: roomCode, playerId, answer });
  };

  return (
    <VStack minH="100vh" justify="center" bg="pink.50" p={4}>
      {question ? (
        <Box bg="white" p={6} rounded="xl" shadow="lg" w="full" maxW="md">
          <HStack justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.400">
              Soal {questionNumber} dari {totalQuestions}
            </Text>
            <CircularProgress value={(timeLeft / 15) * 100} color="pink.400" size="50px">
              <CircularProgressLabel>{timeLeft}s</CircularProgressLabel>
            </CircularProgress>
          </HStack>

          {/* Soal image-blur */}
          {question.type === 'image-blur' ? (
            <Box textAlign="center" mb={4}>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                {question.prompt || 'Siapakah member JKT48 di gambar berikut?'}
              </Text>
              <Image
                src={question.image}
                alt="Blurred"
                mx="auto"
                boxSize="240px"
                objectFit="cover"
                borderRadius="lg"
                filter="blur(10px)"
              />
            </Box>
          ) : (
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              {question.text}
            </Text>
          )}

          <VStack spacing={3}>
            {!answerResult ? (
              question.options.map((opt, idx) => (
                <Button
                  key={idx}
                  colorScheme={selectedAnswer === opt ? "blue" : "gray"}
                  onClick={() => handleAnswer(opt)}
                  w="full"
                  isDisabled={selectedAnswer !== null}
                >
                  {opt}
                </Button>
              ))
            ) : (
              <>
                {Object.entries(answerResult.answers).map(([pid, res]) => (
                  <Text key={pid} color={res.isCorrect ? "green.400" : "red.400"}>
                    {pid === playerId ? "Kamu" : "Lawan"}: {res.answer || "(Tidak menjawab)"} ({res.isCorrect ? "Benar" : "Salah"})
                  </Text>
                ))}
              </>
            )}
          </VStack>

          {!answerResult && selectedAnswer && (
            <VStack mt={4}>
              <Spinner color="pink.400" />
              <Text fontSize="sm" color="gray.400">Menunggu jawaban lawan...</Text>
            </VStack>
          )}

          <Progress mt={6} value={(questionNumber / totalQuestions) * 100} colorScheme="pink" />
        </Box>
      ) : (
        <Text fontSize="lg" color="pink.400" fontWeight="bold">Memuat Soal...</Text>
      )}
    </VStack>
  );
};

export default VersusBattleScreen;
