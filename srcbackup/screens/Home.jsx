import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Center,
  VStack,
  ScaleFade,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { MdQuiz, MdFeedback } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import VersusModal from "../components/VersusModal";
import SoloModal from "../components/SoloModal";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function Home() {
  const navigate = useNavigate();

  const bg = useColorModeValue(
    "rgba(255, 255, 255, 0.85)",
    "rgba(45, 45, 45, 0.85)"
  );
  const headingColor = useColorModeValue("red.600", "red.300");
  const textColor = useColorModeValue("gray.700", "gray.300");

  const handleNavigate = (path) => {
    navigate(`/${path}`);
  };

  return (
    <Center
      minH="100vh"
      px={{ base: 2, md: 4 }}
      bgGradient="linear(to-r, red.400, gray.100, red.400, white)"
      bgSize="200% 200%"
      animation={`${gradientAnimation} 12s ease infinite`}
    >
      <ScaleFade initialScale={0.85} in={true}>
        <Box
          bg={bg}
          backdropFilter="blur(14px)"
          p={{ base: 6, md: 14 }}
          rounded="3xl"
          shadow="2xl"
          maxW="lg"
          w="full"
          textAlign="center"
          border="1px solid"
          borderColor={useColorModeValue("red.200", "red.700")}
          position="relative"
          overflow="hidden"
        >
          <Icon
            as={MdQuiz}
            boxSize={{ base: 16, md: 24 }}
            color="red.400"
            mb={4}
            _hover={{ transform: "rotate(10deg)", transition: "0.3s" }}
          />
          <Heading
            color={headingColor}
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            letterSpacing="wide"
            mb={4}
            textShadow="0 0 6px rgba(229, 62, 62, 0.5)"
          >
            Quiz Interaktif JKT48
          </Heading>
          <Text
            fontSize={{ base: "md", md: "xl" }}
            color={textColor}
            maxW="md"
            mx="auto"
            mb={8}
            fontWeight="medium"
            letterSpacing="wider"
          >
            Pilih mode permainan untuk memulai tantangan seru tentang JKT48!
          </Text>

          <VStack spacing={5}>
            <Button
              colorScheme="red"
              size="lg"
              w="full"
              fontWeight="bold"
              onClick={() => handleNavigate("quiz?mode=practice")}
              borderRadius="full"
            >
              🎓 Practice
            </Button>

            <VersusModal />

            <SoloModal />

            <Button
              colorScheme="red"
              size="lg"
              w="full"
              fontWeight="bold"
              onClick={() => handleNavigate("leaderboard")}
              borderRadius="full"
            >
              🏆 Leaderboard
            </Button>

            <Button
              leftIcon={<MdFeedback />}
              colorScheme="gray"
              size="lg"
              w="full"
              fontWeight="bold"
              onClick={() => handleNavigate("suggest")}
              borderRadius="full"
            >
              💡 Saran Soal
            </Button>
          </VStack>

          {/* Decorative bubbles */}
          <Box
            position="absolute"
            top="-40px"
            left="-40px"
            w="100px"
            h="100px"
            bg="red.300"
            rounded="full"
            filter="blur(70px)"
            opacity={0.6}
            zIndex={-1}
          />
          <Box
            position="absolute"
            bottom="-50px"
            right="-50px"
            w="120px"
            h="120px"
            bg="gray.200"
            rounded="full"
            filter="blur(90px)"
            opacity={0.7}
            zIndex={-1}
          />
        </Box>
      </ScaleFade>
    </Center>
  );
}

export default Home;
