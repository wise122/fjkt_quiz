import React, { useState } from 'react';
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
  Select,
  Avatar,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const members = [
    { name: "Feni Fitriyanti", image: "/images/member/Gen3_feni_fitriyanti.jpg" },
    { name: "Shania Gracia", image: "/images/member/Gen3_shania_gracia.jpg" },
    { name: "Gita Sekar Andarini", image: "/images/member/Gen6_gita_sekar_andarini.jpg" },
    { name: "Angelina Christy", image: "/images/member/Gen7_angelina_christy.jpg" },
    { name: "Febriola Sinambela", image: "/images/member/Gen7_febriola_sinambela.jpg" },
    { name: "Freya Jayawardana", image: "/images/member/Gen7_freya_jayawardana.jpg" },
    { name: "Helisma Putri", image: "/images/member/Gen7_helisma_putri.jpg" },
    { name: "Jessica Chandra", image: "/images/member/Gen7_jessica_chandra.jpg" },
    { name: "Mutiara Azzahra", image: "/images/member/Gen7_mutiara_azzahra.jpg" },
    { name: "Cornelia Vanisa", image: "/images/member/Gen8_cornelia_vanisa.jpg" },
    { name: "Fiony Alveria", image: "/images/member/Gen8_fiony_alveria.jpg" },
    { name: "Lulu Salsabila", image: "/images/member/Gen8_lulu_salsabila.jpg" },
    { name: "Indah Cahya", image: "/images/member/Gen9_indah_cahya.jpg" },
    { name: "Kathrina Irene", image: "/images/member/Gen9_kathrina_irene.jpg" },
    { name: "Marsha Lenathea", image: "/images/member/Gen9_marsha_lenathea.jpg" },
    { name: "Amanda Sukma", image: "/images/member/Gen10_amanda_sukma.jpg" },
    { name: "Aurellia JG", image: "/images/member/Gen10_aurellia_jg.jpg" },
    { name: "Gabriela Abigail", image: "/images/member/Gen10_gabriela_abigail.jpg" },
    { name: "Indira Seruni", image: "/images/member/Gen10_indira_seruni.jpg" },
    { name: "Jesslyn Elly", image: "/images/member/Gen10_jesslyn_elly.jpg" },
    { name: "Raisha Syifa", image: "/images/member/Gen10_raisha_syifa.jpg" },
    { name: "Alya Amanda", image: "/images/member/Gen11_alya_amanda.jpg" },
    { name: "Anindya Ramadhani", image: "/images/member/Gen11_anindya_ramadhani.jpg" },
    { name: "Cathleen Nixie", image: "/images/member/Gen11_cathleen_nixie.jpg" },
    { name: "Celline Thefani", image: "/images/member/Gen11_celline_thefani.jpg" },
    { name: "Chelsea Davina", image: "/images/member/Gen11_chelsea_davina.jpg" },
    { name: "Cynthia Puteri", image: "/images/member/Gen11_cynthia_puteri.jpg" },
    { name: "Dena Natalia", image: "/images/member/Gen11_dena_natalia.jpg" },
    { name: "Desy Natalia", image: "/images/member/Gen11_desy_natalia.jpg" },
    { name: "Gendis Mayrannisa", image: "/images/member/Gen11_gendis_mayrannisa.jpg" },
    { name: "Grace Octaviani", image: "/images/member/Gen11_grace_octaviani.jpg" },
    { name: "Greseella Adhalia", image: "/images/member/Gen11_greseella_adhalia.jpg" },
    { name: "Michelle Alexandra", image: "/images/member/Gen11_michelle_alexandra.jpg" },
    { name: "Abigail Rachel", image: "/images/member/Gen12_abigail_rachel.jpg" },
    { name: "Adeline Wijaya", image: "/images/member/Gen12_adeline_wijaya.jpg" },
    { name: "Aurel Alanaj", image: "/images/member/Gen12_aurel_alanaj.jpg" },
    { name: "Catherine Vallencia", image: "/images/member/Gen12_catherine_vallencia.jpg" },
    { name: "Fritzy Rosmerian", image: "/images/member/Gen12_fritzy_rosmerian.jpg" },
    { name: "Hillary Abigail", image: "/images/member/Gen12_hillary_abigail.jpg" },
    { name: "Jazlyn Trisha", image: "/images/member/Gen12_jazlyn_trisha.jpg" },
    { name: "Michelle Lavia", image: "/images/member/Gen12_michelle_lavia.jpg" },
    { name: "Nayla Suji", image: "/images/member/Gen12_nayla_suji.jpg" },
    { name: "Nina Tutachia", image: "/images/member/Gen12_nina_tutachia.jpg" },
    { name: "Oline Manuel", image: "/images/member/Gen12_oline_manuel.jpg" },
    { name: "Regina Wilian", image: "/images/member/Gen12_regina_wilian.jpg" },
    { name: "Ribka Budiman", image: "/images/member/Gen12_ribka_budiman.jpg" },
    { name: "Shabia Qisnaila", image: "/images/member/Gen12_shabia_qisnaila.jpg" },
    { name: "Victoria Kimberly", image: "/images/member/Gen12_victoria_kimberly.jpg" },
    { name: "Astrella Virgiananda", image: "/images/member/Gen13_Astrella_Virgiananda.jpg" },
    { name: "Aulia Riza", image: "/images/member/Gen13_Aulia_Riza.jpg" },
    { name: "Bong Aprilia", image: "/images/member/Gen13_Bong_Aprilia.jpg" },
    { name: "Hagia Sophia", image: "/images/member/Gen13_Hagia_Sophia.jpg" },
    { name: "Humaira Ramadhani", image: "/images/member/Gen13_Humaira_Ramadhani.jpg" },
    { name: "Jacqueline Immanuela", image: "/images/member/Gen13_Jacqueline_Immanuela.jpg" },
    { name: "Jemima Evodie", image: "/images/member/Gen13_Jemima_Evodie.jpg" },
    { name: "Mikaela Kusjanto", image: "/images/member/Gen13_Mikaela_Kusjanto.jpg" },
    { name: "Nur Intan", image: "/images/member/Gen13_Nur_Intan.jpg" },
  ];

const SoloChallengeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const validateUsername = () => {
    if (!username.trim()) {
      toast({
        title: 'Masukkan username terlebih dahulu!',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const handleStartSolo = () => {
    if (!validateUsername()) return;

    const avatar = selectedMember?.image || '';
    const member = selectedMember?.name || '';
    const query = `?username=${encodeURIComponent(username)}&avatar=${encodeURIComponent(avatar)}&member=${encodeURIComponent(member)}`;

    navigate(`/solo${query}`);
    onClose();
  };

  const handleSelectChange = (e) => {
    const name = e.target.value;
    const member = members.find((m) => m.name === name);
    setSelectedMember(member || null);
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" size="lg" w="full" fontWeight="bold" borderRadius="full">
        🎯 Solo Challenge
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
        <ModalOverlay />
        <ModalContent p={4} borderRadius="2xl">
          <ModalHeader textAlign="center" fontWeight="bold">
            Solo Challenge
          </ModalHeader>
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
                  <option key={member.name} value={member.name}>
                    {member.name}
                  </option>
                ))}
              </Select>

              <Input
                placeholder="Isi Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                borderRadius="full"
              />

              <Button onClick={handleStartSolo} colorScheme="teal" size="lg" w="full" fontWeight="bold" borderRadius="full">
                🚀 Mulai
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose} borderRadius="full">
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SoloChallengeModal;
