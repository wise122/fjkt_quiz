import React, { useState, useEffect } from 'react';
import {
  Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, VStack, HStack, Input, Text, useToast, Select, Avatar
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getSocket } from '../socket';

const members = [ 
  // --- (data members sama persis seperti milikmu tadi) ---
  { name: "Feni Fitriyanti", image: "/images/member/Gen3_feni_fitriyanti.jpg" },
  { name: "Shania Gracia", image: "/images/member/Gen3_shania_gracia.jpg" },
  // ... (semua member lainnya tetap)
  { name: "Nur Intan", image: "/images/member/Gen13_Nur_Intan.jpg" }
];

const VersusModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  

  const validateUsername = () => {
    if (!username.trim()) {
      toast({
        title: 'Masukkan username!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const getQuery = () => {
    const avatar = selectedMember?.image || '';
    const member = selectedMember?.name || '';
    return `?username=${encodeURIComponent(username)}&avatar=${encodeURIComponent(avatar)}&member=${encodeURIComponent(member)}`;
  };

  const handleMatchmaking = () => {
    if (!validateUsername()) return;
    navigate(`/versus/matchmaking${getQuery()}`);
    onClose();
  };

  const handleCreateRoom = () => {
    if (!validateUsername()) return;
    const newRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    navigate(`/versus/room/${newRoomCode}${getQuery()}`);
    onClose();
  };

  const handleJoinRoom = () => {
    if (!validateUsername()) return;
    if (!roomCode.trim()) {
      toast({
        title: 'Masukkan kode room!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    navigate(`/versus/room/${roomCode}${getQuery()}`);
    onClose();
  };

  const handleSelectChange = (e) => {
    const name = e.target.value;
    const member = members.find((m) => m.name === name);
    setSelectedMember(member || null);
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="red" size="lg" w="full" fontWeight="bold" borderRadius="full">
        🔥 Main 1 vs 1
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
        <ModalOverlay />
        <ModalContent p={4} borderRadius="2xl">
          <ModalHeader textAlign="center" fontWeight="bold">Pilih Mode 1 vs 1</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              {selectedMember && (
                <Avatar src={selectedMember.image} name={selectedMember.name} size="xl" />
              )}

              <Select
                placeholder="Pilih Foto Profil (opsional)"
                onChange={handleSelectChange}
                borderRadius="full"
                value={selectedMember?.name || ''}
              >
                {members.map((member) => (
                  <option key={member.name} value={member.name}>{member.name}</option>
                ))}
              </Select>

              <Input
                placeholder="Isi Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                borderRadius="full"
              />

              <Button onClick={handleMatchmaking} colorScheme="red" size="lg" w="full" fontWeight="bold" borderRadius="full">
                🔍 Matchmaking Otomatis
              </Button>

              <Text fontWeight="medium">Atau masukkan kode room:</Text>

              <HStack w="full">
                <Input
                  placeholder="Kode Room"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  borderRadius="full"
                />
                <Button colorScheme="red" borderRadius="full" onClick={handleJoinRoom}>
                  Gabung
                </Button>
              </HStack>

              <Button onClick={handleCreateRoom} colorScheme="red" size="lg" w="full" fontWeight="bold" borderRadius="full">
                🎯 Buat Room Baru
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose} borderRadius="full">Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VersusModal;
