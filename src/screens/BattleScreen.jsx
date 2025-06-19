import React, { useEffect, useState } from "react";
import {
  Box, Button, Center, Heading, VStack, Text, Progress, useToast, CircularProgress, CircularProgressLabel
} from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getSocket } from "../socket";

const BattleScreen = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const playerId = searchParams.get("playerId");

  const toast = useToast();
  const navigate = useNavigate();
  const socket = getSocket();

  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerInterval, setTimerInterval] = useState(null);

  // Handle pertanyaan baru
  useEffect(() => {
    if (!socket) return;

    socket.on("newQuestion", (data) => {
      setQuestion(data);
      setSelectedAnswer(null);
      setAnswerResult(null);
      setIsSubmitting(false);
      setQuestionNumber(data.questionNumber);
      setTotalQuestions(data.totalQuestions);
      setTimeLeft(20);
    });

    socket.on("answerResult", (result) => {
      setAnswerResult(result);
      clearInterval(timerInterval);
    });

    socket.on("battleFinished", (data) => {
      const { yourScore, opponentScore, totalQuestions, yourAvatar, opponentAvatar } = data;
      navigate("/result", { state: { yourScore, opponentScore, yourAvatar, opponentAvatar } });
    });

    return () => {
      socket.off("newQuestion");
      socket.off("answerResult");
      socket.off("battleFinished");
    };
  }, [socket, navigate]);

  // Timer countdown
  useEffect(() => {
    if (!question) return;
    if (timerInterval) clearInterval(timerInterval);

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!selectedAnswer && !isSubmitting) {
            handleAnswer(null); // Auto submit kosong jika habis waktu
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerInterval(interval);

    return () => clearInterval(interval);
  }, [question]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsSubmitting(true);
    socket.emit("submitAnswer", { roomId, playerId, answer });
  };

  return (
    <Center minH="100vh" bg="#FFF5F7" px={4}>
      <Box bg="white" p={10} borderRadius="2xl" shadow="xl" border="3px solid #FBB6CE" maxW="lg" w="full" textAlign="center">
        <Heading size="lg" color="pink.500" mb={6}>🎯 Battle Quiz</Heading>

        <Progress value={(questionNumber / totalQuestions) * 100} mb={6} borderRadius="full" colorScheme="pink" />

        {question ? (
          <>
            <Box bg="pink.50" p={6} borderRadius="xl" shadow="md" mb={6} minH="150px">
              <Text fontSize="xl" fontWeight="semibold">{question.question}</Text>
            </Box>

            <VStack spacing={4}>
              {question.options.map((opt, idx) => (
                <Button
                  key={idx}
                  w="100%"
                  colorScheme={
                    answerResult ? (
                      opt === question.correctAnswer
                        ? "green"
                        : (selectedAnswer === opt ? "red" : "gray")
                    ) : (selectedAnswer === opt ? "blue" : "pink")
                  }
                  isDisabled={!!answerResult || isSubmitting}
                  onClick={() => handleAnswer(opt)}
                  size="lg"
                >
                  {opt}
                </Button>
              ))}
            </VStack>

            <Box mt={6}>
              <CircularProgress value={(timeLeft / 20) * 100} color="pink.400" size="80px" thickness="10px">
                <CircularProgressLabel fontSize="xl">{timeLeft}s</CircularProgressLabel>
              </CircularProgress>
            </Box>

            {answerResult && (
              <Box mt={4}>
                <Text color="green.500" fontWeight="bold" fontSize="lg">
                  {answerResult.answers[playerId]?.isCorrect ? "✅ Jawaban kamu benar!" : "❌ Jawaban kamu salah!"}
                </Text>
              </Box>
            )}
          </>
        ) : (
          <Text fontSize="lg" fontWeight="medium">Menunggu pertanyaan...</Text>
        )}
      </Box>
    </Center>
  );
};

export default BattleScreen;
