import React, { useState, useEffect } from "react";
import {
  Box, Button, Text, VStack, Progress, useToast,
  HStack, Center, Badge, Spinner, Avatar
} from "@chakra-ui/react";
import { FaClock, FaStar } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import questionsData from "../data/questions";

const MAX_QUESTIONS = 20;

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function SoloChallenge() {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();

  const [username, setUsername] = useState("Player");
  const [avatar, setAvatar] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selected, setSelected] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const shuffledQuestions = shuffleArray(questionsData).slice(0, MAX_QUESTIONS);
    setQuestions(shuffledQuestions);

    const usernameParam = searchParams.get("username");
    const avatarParam = searchParams.get("avatar");

    setUsername(usernameParam || "Player");
    setAvatar(avatarParam ? decodeURIComponent(avatarParam) : null);
  }, []);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (isFinished || isTransitioning) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          handleAnswer("TIMEOUT");
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex, isFinished, isTransitioning]);

  const handleAnswer = (option) => {
    if (selected !== null) return;
    setSelected(option);

    if (option === currentQuestion?.answer) {
      setScore((prev) => prev + 1);
      toast({
        title: "Benar!",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } else if (option === "TIMEOUT") {
      toast({
        title: "Waktu Habis!",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Salah!",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }

    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        if (currentIndex + 1 < totalQuestions) {
          setCurrentIndex((prev) => prev + 1);
          setTimeLeft(15);
          setSelected(null);
          setIsTransitioning(false);
        } else {
          setIsFinished(true);
          saveScore();
          saveToLeaderboard();
          saveToLeaderboardBackend();
        }
      }, 400);
    }, 600);
  };

  const saveScore = () => {
    const prevScores = JSON.parse(localStorage.getItem("soloScores") || "[]");
    const newScores = [...prevScores, { date: new Date().toISOString(), score }];
    localStorage.setItem("soloScores", JSON.stringify(newScores));
  };

  const saveToLeaderboard = () => {
    const prevLeaders = JSON.parse(localStorage.getItem("soloLeaderboard") || "[]");
    const newEntry = {
      username,
      avatar,
      score,
      date: new Date().toISOString(),
    };
    const updatedLeaders = [...prevLeaders, newEntry];
    updatedLeaders.sort((a, b) => b.score - a.score);
    localStorage.setItem("soloLeaderboard", JSON.stringify(updatedLeaders));
  };

  const saveToLeaderboardBackend = async () => {
    try {
      await fetch("https://q.sfinbusinesssolution.net/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          avatar,
          score,
          date: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Gagal kirim ke backend leaderboard:", err);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (questions.length === 0 || (!currentQuestion && !isFinished)) {
    return (
      <Center minH="100vh" bgGradient="linear(to-br, pink.50, pink.100)">
        <Spinner size="xl" color="pink.400" />
      </Center>
    );
  }

  return (
    <Center minH="100vh" bgGradient="linear(to-br, pink.50, pink.100)" px={4}>
      <Box
        bg="white"
        p={8}
        borderRadius="2xl"
        shadow="xl"
        w="full"
        maxW="lg"
        textAlign="center"
        border="3px solid"
        borderColor="pink.300"
        position="relative"
      >
        <Badge position="absolute" top={4} right={4} colorScheme="pink">
          Solo Mode
        </Badge>

        <VStack mb={4}>
          <Avatar
            size="xl"
            name={username}
            src={avatar}
            bg="pink.200"
            color="white"
          />
          <Text fontSize="xl" fontWeight="bold">{username}</Text>
        </VStack>

        <Progress
          value={((currentIndex + (isFinished ? 1 : 0)) / totalQuestions) * 100}
          colorScheme="pink"
          mb={4}
          borderRadius="full"
          height="8px"
        />

        {isFinished ? (
          <VStack spacing={6}>
            <Text fontSize="3xl" fontWeight="bold">
              Skor Kamu: {score} / {totalQuestions}
            </Text>
            <Button colorScheme="pink" size="lg" rounded="full" onClick={handleBack}>
              Kembali
            </Button>
          </VStack>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <VStack spacing={6}>
                <Box bg="pink.50" p={5} rounded="xl" mb={4} border="1px solid pink">
                  <Text fontSize="md" color="gray.500">
                    Soal {currentIndex + 1} dari {totalQuestions}
                  </Text>
                  <Text fontSize="xl" fontWeight="bold" mt={2}>
                    {currentQuestion.question}
                  </Text>
                </Box>

                <VStack spacing={3} w="full">
                  {currentQuestion.options.map((opt, idx) => (
                    <Button
                      key={idx}
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
                  <HStack>
                    <FaClock color="gray" />
                    <Text>{timeLeft} detik</Text>
                  </HStack>
                  <HStack>
                    <FaStar color="gold" />
                    <Text>{score} Poin</Text>
                  </HStack>
                </HStack>
              </VStack>
            </motion.div>
          </AnimatePresence>
        )}
      </Box>
    </Center>
  );
}

export default SoloChallenge;
