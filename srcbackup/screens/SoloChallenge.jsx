import React, { useState, useEffect } from "react";
import {
  Box, Button, Text, VStack, Progress, useToast,
  HStack, Center, Badge, Spinner, Avatar, Image
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
        }
      }, 400);
    }, 600);
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
    <Center minH="100vh" bgGradient="linear(to-br, pink.50, pink.100)" px={4} py={8}>
      <VStack spacing={6}>
        {/* Avatar & Username di atas */}
        <VStack spacing={2}>
          <Avatar size="2xl" name={username} src={avatar} bg="pink.300" />
          <Text fontSize="2xl" fontWeight="bold">{username}</Text>
        </VStack>

        {/* Card Quiz */}
        <Box
          bg="white"
          p={10}
          borderRadius="3xl"
          shadow="2xl"
          w="full"
          maxW="md"
          textAlign="center"
          border="2px solid"
          borderColor="pink.200"
          position="relative"
        >
          <Badge position="absolute" top={4} right={4} colorScheme="pink">
            SOLO MODE
          </Badge>

          <Progress
            value={((currentIndex + (isFinished ? 1 : 0)) / totalQuestions) * 100}
            colorScheme="pink"
            mb={6}
            borderRadius="full"
            height="10px"
          />

          {isFinished ? (
            <VStack spacing={6}>
              <Text fontSize="3xl" fontWeight="bold">
                Skor Kamu: {score} / {totalQuestions}
              </Text>
              <Button colorScheme="pink" size="lg" rounded="full" onClick={handleBack}>
                Kembali ke Home
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
                <VStack spacing={8}>
                  <Box bg="pink.50" p={5} rounded="xl" border="1px solid pink">
                    <Text fontSize="md" color="gray.500" mb={2}>
                      Soal {currentIndex + 1} dari {totalQuestions}
                    </Text>

                    {currentQuestion.type === 'image-blur' ? (
                      <Box textAlign="center" mb={2}>
                        <Text fontSize="lg" fontWeight="semibold" mb={4}>
                          {currentQuestion.prompt || 'Siapakah member JKT48 di gambar berikut?'}
                        </Text>
                        <Image
                          src={currentQuestion.image}
                          alt="Blurred"
                          mx="auto"
                          boxSize="240px"
                          objectFit="cover"
                          borderRadius="lg"
                          filter="blur(10px)"
                        />
                      </Box>
                    ) : (
                      <Box maxH="300px" overflowY="auto" px={2}>
                        <Text fontSize="xl" fontWeight="semibold">
                          {currentQuestion.question}
                        </Text>
                      </Box>
                    )}
                  </Box>

                  <VStack spacing={4} w="full">
                    {currentQuestion.options.map((opt, idx) => (
                      <Button
                        key={idx}
                        size="lg"
                        fontSize="md"
                        colorScheme={selected === opt ? "pink" : "gray"}
                        variant={selected === opt ? "solid" : "outline"}
                        onClick={() => handleAnswer(opt)}
                        isDisabled={selected !== null}
                        whiteSpace="normal"
                        textAlign="left"
                        px={6}
                        py={4}
                        maxW="90%"
                        alignSelf="center"
                        boxShadow="md"
                      >
                        {opt}
                      </Button>
                    ))}
                  </VStack>

                  <HStack mt={6} justify="space-between" px={4}>
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
      </VStack>
    </Center>
  );
}

export default SoloChallenge;
