import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Select,
  useToast,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const SuggestScreen = () => {
  const toast = useToast();
  const navigate = useNavigate(); // ✅ untuk navigasi back

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!question || options.includes("") || !answer || !difficulty) {;
      toast({
        title: "Gagal",
        description: "Semua field harus diisi.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const res = await fetch("https://q.sfinbusinesssolution.net/api/suggest-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          options,
          answer,
          difficulty,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Berhasil",
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setQuestion("");
        setOptions(["", "", "", ""]);
        setAnswer("");
        setDifficulty("");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Center minH="100vh" bg="gray.50" px={4} position="relative">
      {/* 🔙 Tombol Back */}
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Kembali"
        position="absolute"
        top={4}
        left={4}
        colorScheme="pink"
        onClick={() => navigate("/")}
      />

      <Box bg="white" p={8} rounded="lg" shadow="md" maxW="lg" w="full">
        <Heading fontSize="2xl" mb={6} textAlign="center" color="pink.500">
          ✏️ Saran Soal
        </Heading>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Pertanyaan</FormLabel>
            <Textarea
              placeholder="Tulis pertanyaan di sini"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </FormControl>

          {options.map((opt, index) => (
            <FormControl key={index} isRequired>
              <FormLabel>Pilihan {index + 1}</FormLabel>
              <Input
                placeholder={`Pilihan ${index + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(e.target.value, index)}
              />
            </FormControl>
          ))}

          <FormControl isRequired>
            <FormLabel>Jawaban Benar</FormLabel>
            <Select
              placeholder="Pilih jawaban yang benar"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            >
              {options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt || `Pilihan ${i + 1}`}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Tingkat Kesulitan</FormLabel>
            <Select
              placeholder="Pilih tingkat kesulitan"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="mudah">Mudah</option>
              <option value="sedang">Sedang</option>
              <option value="sulit">Sulit</option>
            </Select>
          </FormControl>

          <Button colorScheme="pink" size="lg" w="full" onClick={handleSubmit}>
            Kirim Saran Soal
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default SuggestScreen;
