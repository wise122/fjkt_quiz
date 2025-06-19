import React, { useEffect, useState } from "react";
import {
  Box, Button, Center, Heading, VStack, Text, Progress, useToast
} from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { getSocket } from "../socket";

const socket = getSocket();  // <- kita ambil socket dari sini

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

  useEffect(() => {
    if (!socket) return;

    socket.on("newQuestion", (data) => {
      setQuestion(data);
      setSelectedAnswer(null);
      setAnswerResult(null);
      setIsSubmitting(false); 
      setQuestionNumber(data.questionNumber);
      setTotalQuestions(data.totalQuestions);
    });

    socket.on("answerResult", (result) => {
      setAnswerResult(result);
    });

    socket.on("battleFinished", (data) => {
      const { yourScore, opponentScore, totalQuestions, yourAvatar, opponentAvatar } = data;
      navigate("/result", { state: { yourScore, opponentScore, yourAvatar, opponentAvatar } })
    });
    return () => {
      socket.off("newQuestion");
      socket.off("answerResult");
      socket.off("battleFinished");
    };
  }, [socket, toast, navigate]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsSubmitting(true);
    socket.emit("submitAnswer", { roomId, playerId, answer });
  };

  return (
    <Center minH="100vh" bg="#FFF5F7" px={4}>
      <Box bg="white" p={8} borderRadius="xl" shadow="md" border="2px solid #FBB6CE" maxW="md" w="full" textAlign="center">
        <Heading size="md" color="pink.500" mb={4}>🎯 Battle Quiz</Heading>

        {question ? (
          <>
            <Progress value={(questionNumber / totalQuestions) * 100} mb={4} />
            <Text fontSize="lg" mb={6}>{question.question}</Text>

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
                >
                  {opt}
                </Button>
              ))}
            </VStack>

            {answerResult && (
              <Box mt={4}>
                <Text color="green.500" fontWeight="bold">
                  {answerResult.answers[playerId]?.isCorrect ? "✅ Jawaban kamu benar!" : "❌ Jawaban kamu salah!"}
                </Text>
              </Box>
            )}
          </>
        ) : (
          <Text>Menunggu pertanyaan berikutnya...</Text>
        )}
      </Box>
    </Center>
  );
};

export default BattleScreen;
