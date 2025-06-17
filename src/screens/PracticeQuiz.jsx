import React, { useState } from 'react';
import {
  Box,
  Button,
  RadioGroup,
  Stack,
  Radio,
  Text,
  VStack,
  Heading,
  Flex,
  useToast,
  useColorModeValue,
  Image,
  Select,
} from '@chakra-ui/react';
import questionsData from '../data/questions';

const shuffle = (arr) =>
  [...arr]
    .map((v) => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ v }) => v);

const PracticeQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const toast = useToast();

  const bgColor = useColorModeValue('whiteAlpha.900', 'gray.900');
  const borderColor = useColorModeValue('red.500', 'red.300');

  const startQuiz = () => {
    const filtered = questionsData.filter(
      (q) => q.difficulty === selectedDifficulty
    );
    const shuffled = shuffle(filtered).map((q) => ({
      ...q,
      options: shuffle(q.options),
    }));
    if (shuffled.length === 0) {
      toast({
        title: 'Belum ada soal untuk tingkat ini.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setQuestions(shuffled);
    setCurrent(0);
    setSelected('');
    setShowAnswer(false);
  };

  const handleNext = () => {
    setSelected('');
    setShowAnswer(false);
    setCurrent((prev) => prev + 1);
  };

  const resetQuiz = () => {
    setSelectedDifficulty('');
    setQuestions([]);
  };

  if (!selectedDifficulty || questions.length === 0) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="red.500" p={8}>
        <Box
          bg="white"
          p={10}
          borderRadius="xl"
          boxShadow="xl"
          w="full"
          maxW="lg"
          textAlign="center"
        >
          <Heading size="lg" color="red.600" mb={6}>
            Practice Mode: Pilih Tingkat Kesulitan
          </Heading>
          <Select
            placeholder="Pilih difficulty..."
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            size="lg"
            mb={6}
          >
            <option value="mudah">Mudah</option>
            <option value="medium">Sedang</option>
            <option value="sulit">Sulit</option>
          </Select>
          <Button
            colorScheme="red"
            size="lg"
            onClick={startQuiz}
            isDisabled={!selectedDifficulty}
            w="full"
          >
            Mulai Latihan
          </Button>
        </Box>
      </Flex>
    );
  }

  const question = questions[current];

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, red.400, red.600)"
      px={4}
      py={10}
    >
      <Box
        p={8}
        maxW="600px"
        w="full"
        shadow="2xl"
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="3xl"
        bg={bgColor}
        fontFamily="'Poppins', sans-serif"
        position="relative"
      >
        <Heading size="lg" color="red.600" fontWeight="extrabold" mb={4}>
          Practice Quiz JKT48
        </Heading>

        <Text fontSize="md" color="gray.500" mb={2}>
          Soal {current + 1} dari {questions.length}
        </Text>

        {question.type === 'image-blur' ? (
          <Box textAlign="center" mb={6}>
            <Text fontSize="xl" fontWeight="semibold" mb={4}>
              {question.prompt || 'Siapakah member JKT48 di gambar berikut?'}
            </Text>
            <Image
              src={question.image}
              alt="Blurred JKT48 member"
              mx="auto"
              boxSize="240px"
              objectFit="cover"
              borderRadius="lg"
              filter="blur(10px)"
            />
          </Box>
        ) : (
          <Text fontSize="xl" fontWeight="semibold" mb={6}>
            {question.question}
          </Text>
        )}

        <RadioGroup
          onChange={(val) => {
            setSelected(val);
            setShowAnswer(true);
          }}
          value={selected}
        >
          <Stack spacing={4}>
            {question.options.map((opt, i) => (
              <Radio
                key={i}
                value={opt}
                size="lg"
                colorScheme={
                  showAnswer && opt === question.answer
                    ? 'green'
                    : selected === opt && opt !== question.answer
                    ? 'red'
                    : 'gray'
                }
                p={3}
                borderRadius="md"
              >
                {opt}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>

        {showAnswer && (
          <Text fontSize="md" mt={4} color="green.600" fontWeight="bold">
            ✅ Jawaban benar: {question.answer}
          </Text>
        )}

        <VStack mt={8} spacing={4}>
          {current + 1 < questions.length ? (
            <Button colorScheme="red" size="lg" onClick={handleNext} w="full">
              Soal Berikutnya
            </Button>
          ) : (
            <Button colorScheme="gray" size="lg" onClick={resetQuiz} w="full">
              Selesai & Ulangi
            </Button>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default PracticeQuiz;
