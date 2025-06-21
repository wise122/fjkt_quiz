import React, { useEffect, useState } from "react";
import {
  Box, Button, Center, Heading, VStack, Text, Progress, useToast,
  CircularProgress, CircularProgressLabel, useBreakpointValue
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

  const circularSize = useBreakpointValue({ base: "60px", md: "80px" });
  const circularFontSize = useBreakpointValue({ base: "lg", md: "xl" });

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

  useEffect(() => {
    if (!question) return;
    if (timerInterval) clearInterval(timerInterval);

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!selectedAnswer && !isSubmitting) {
            handleAnswer(null);
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
    <Center minH="100vh" bg="#FFF5F7" px={{ base: 2, md: 4 }}>
      <Box
        bg="white"
        p={{ base: 5, md: 10 }}
        borderRadius="2xl"
        shadow="xl"
        border="3px solid #FBB6CE"
        maxW={{ base: "95%", md: "lg" }}
        w="full"
        textAlign="center"
      >
        <Heading size={{ base: "md", md: "lg" }} color="pink.500" mb={{ base: 4, md: 6 }}>
          🎯 Battle Quiz
        </Heading>

        <Progress value={(questionNumber / totalQuestions) * 100} mb={{ base: 4, md: 6 }} borderRadius="full" colorScheme="pink" />

        {question ? (
          <>
            <Box
              bg="pink.50"
              p={{ base: 4, md: 6 }}
              borderRadius="xl"
              shadow="md"
              mb={{ base: 4, md: 6 }}
              minH={{ base: "120px", md: "150px" }}
            >
              <Text fontSize={{ base: "md", md: "xl" }} fontWeight="semibold">
                {question.question}
              </Text>
            </Box>

            <VStack spacing={{ base: 3, md: 4 }}>
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
                  size={{ base: "md", md: "lg" }}
                >
                  {opt}
                </Button>
              ))}
            </VStack>

            <Box mt={{ base: 5, md: 6 }}>
              <CircularProgress value={(timeLeft / 20) * 100} color="pink.400" size={circularSize} thickness="10px">
                <CircularProgressLabel fontSize={circularFontSize}>{timeLeft}s</CircularProgressLabel>
              </CircularProgress>
            </Box>

            {answerResult && (
              <Box mt={{ base: 3, md: 4 }}>
                <Text color="green.500" fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
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
