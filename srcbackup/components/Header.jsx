import React from "react";
import { Box, Heading, Center } from "@chakra-ui/react";

function Header() {
  return (
    <Box bgGradient="linear(to-r, pink.400, pink.300)" py={5} mb={8} shadow="md">
      <Center>
        <Heading color="white" fontSize="3xl" fontFamily="cursive">
          Fjkt Quiz 🎤
        </Heading>
      </Center>
    </Box>
  );
}

export default Header;
