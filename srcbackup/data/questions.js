const questions = [
  {
    question: "Siapa kapten Jkt48 Saat ini?",
    options: ["Freya", "Zee", "Gracia", "Muthe"],
    answer: "Gracia",
    difficulty: "mudah",
  },
  {
    question: "Apa lagu pertama dalam setlist aturan anti cinta ?",
    options: ["Salah Dengan Rock", "Bunga Matahari", "Cahaya Panjang", "Cara Meminum Ramune"],
    answer: "Cahaya Panjang",
    difficulty: "mudah",
  },
  
  {
    question: "Kata orang, member ini mirip bebek. Siapa dia?",
    options: [
      "Eli",
      "Ekin",
      "Elin",
      "Erine"
    ],
    answer: "Erine",
    difficulty: "mudah",
    "createdAt": "2025-06-16T13:14:42.881Z"
  },
  {
    question: "Siapa nama salah satu sensei JKT48?",
    options: [
      "Lia Waode",
      "Ina Waode",
      "Iin Waode",
      "Chika Waode"
    ],
    answer: "Iin Waode",
    difficulty: "sedang",
    "createdAt": "2025-06-16T13:17:51.637Z"
  },
  {
    question: "Member ini satu almamater dengan Menteri Energi dan Sumber Daya Mineral sekarang. Siapa member ini?",
    options: [
      "Gabriela Abigail",
      "Nur Intan",
      "Cynthia Yaputera",
      "Fiony Alveria"
    ],
    answer: "Nur Intan",
    difficulty: "sulit",
    "createdAt": "2025-06-16T13:24:17.835Z"
  },
  {
    question: "Siapakah member jkt48 yang disebut memiliki wajah samping terbaik",
    options: [
      "Ella",
      "Lia",
      "Gracie",
      "Gracia"
    ],
    answer: "Gracia",
    difficulty: "mudah",
    "createdAt": "2025-06-16T13:32:22.721Z"
  },
  {
    question: "satu",
    options: [
      "dua",
      "tiga",
      "empat",
      "lima"
    ],
    answer: "empat",
    difficulty: "sulit",
    "createdAt": "2025-06-16T13:44:43.762Z"
  },
  {
    question: "Member tanpa tim pertama yang menamatkan setlist RKJ 5/5",
    options: [
      "Jessi",
      "Gracia",
      "Freya",
      "Feni"
    ],
    answer: "Freya",
    difficulty: "sulit",
    "createdAt": "2025-06-16T14:05:41.381Z"
  },
  {
    question: "Member gen 11 pertama yang mencapai 100 show",
    options: [
      "Cathy",
      "Chelsea",
      "Gracie",
      "Greesel"
    ],
    answer: "Chelsea",
    difficulty: "sedang",
    "createdAt": "2025-06-16T14:06:37.180Z"
  },
  {
    question: "Berapa jumlah suara yang diperoleh Shani dalam Hasil Akhir Pemilihan Member Single Original JKT48 tahun 2019",
    options: [
      "48.555 suara",
      "72.707 suara",
      "47.717 suara",
      "60.213 suara"
    ],
    answer: "72.707 suara",
    difficulty: "sulit",
    "createdAt": "2025-06-16T14:07:40.347Z"
  },
  {
    question: "Unit song Gendis di theater sementara 2024",
    options: [
      "Tsundere",
      "Manatsu no Christmas Rose",
      "Heart Gata Virus",
      "Nice to Meet You"
    ],
    answer: "Heart Gata Virus",
    difficulty: "sedang",
    "createdAt": "2025-06-16T14:07:42.921Z"
  },
  {
    question: "Pertunjukkan pembuka sebelum Overture di beberapa setlist, dan dibawakan oleh KKS/Academy/Trainee",
    options: [
      "Utawari",
      "Zenza",
      "Furicopy",
      "Kecha"
    ],
    answer: "Zenza",
    difficulty: "mudah",
    "createdAt": "2025-06-16T14:09:09.865Z"
  },
  {
    question: "Jenis chant yang ada di lagu Aitakatta adalah?",
    options: [
      "Gachikoi Kojo",
      "Kahen 3 Ren Mix",
      "Pokemon Pan",
      "Obagei"
    ],
    answer: "Obagei",
    difficulty: "sedang",
    "createdAt": "2025-06-16T14:13:53.884Z"
  },
  {
    question: "Rena Iskandar adalah karakter fiksi yang diperankan oleh?",
    options: [
      "Rena Nozawa",
      "Haruka Nakagawa",
      "Stella Cornelia",
      "Thalia"
    ],
    answer: "Stella Cornelia",
    difficulty: "mudah",
    "createdAt": "2025-06-16T14:14:44.958Z"
  },
  {
    question: "Nama resmi dari Isshou Jamaika",
    options: [
      "American Pop",
      "Gorgeous Gold",
      "Fleur",
      "Leather Plaid"
    ],
    answer: "American Pop",
    difficulty: "sulit",
    "createdAt": "2025-06-16T14:19:40.763Z"
  },
  {
    question: "Seifuku Rumah Nenek dibawakan pada lagu",
    options: [
      "Stripper Cinta",
      "Musim Panas Yang Kacau",
      "Pada Malam Yang Berbadai",
      "Surat Undangan Sang Angin Laut"
    ],
    answer: "Surat Undangan Sang Angin Laut",
    difficulty: "sulit",
    "createdAt": "2025-06-16T14:22:45.877Z"
  },
  {
    question: "Single untuk pemenang Janken Competition 2016",
    options: [
      "Kaze wa Fuiteiru",
      "Love Trip",
      "Halloween Night",
      "Virgin Love"
    ],
    answer: "Love Trip",
    difficulty: "mudah",
    "createdAt": "2025-06-16T14:24:35.596Z"
  },
  {
    question: "Trainee tercepat di New Era yang menjadi Backup Team",
    options: [
      "Catherina Vallencia",
      "Indira Seruni",
      "Gabriela Abigail",
      "Grace Octaviani"
    ],
    answer: "Indira Seruni",
    difficulty: "sedang",
    "createdAt": "2025-06-16T14:25:54.978Z"
  },
  {
    question: "Center \"Member Terbawel\" pada JKT48 Concert Pintu Masa Depan",
    options: [
      "Aninditha Rahma Cahyadi",
      "Nabilah Ayu",
      "Cindy Yuvia",
      "Tan Zhi Hui Celine"
    ],
    answer: "Nabilah Ayu",
    difficulty: "sulit",
    "createdAt": "2025-06-16T14:30:47.977Z"
  },
  {
    question: "Kirti no Koto ga suka?",
    options: [
      "Asmara",
      "Kamu",
      "Jakarta",
      "Cita"
    ],
    answer: "Jakarta",
    difficulty: "sulit",
    "createdAt": "2025-06-16T14:31:48.760Z"
  },
  {
    question: "Harga tiket theater pertama kali",
    options: [
      "25.000",
      "50.000",
      "75.000",
      "100.000"
    ],
    answer: "50.000",
    difficulty: "sedang",
    "createdAt": "2025-06-16T14:32:57.753Z"
  },
  {
    question: "Jaringan Satpam generasi pertama di Theater JKT48 FX Sudirman",
    options: [
      "Dentsu",
      "dari FX Sudirman",
      "CASS",
      "Vernalossom/KKS"
    ],
    answer: "CASS",
    difficulty: "sulit",
    "createdAt": "2025-06-16T14:40:30.600Z"
  },
  {
    question: "Viny, Hanna, Della, .....",
    options: [
      "Uti",
      "Octi",
      "Rona",
      "Sinka"
    ],
    answer: "Octi",
    difficulty: "sulit",
    "createdAt": "2025-06-16T14:42:09.638Z"
  },
  {
    question: "Nama panggilan Rona saat masih menjadi member",
    options: [
      "Ang",
      "Anggi",
      "Ayen",
      "Aya"
    ],
    answer: "Ayen",
    difficulty: "sulit",
    "createdAt": "2025-06-16T14:44:27.396Z"
  },
  {
    question: "Jaringan Convenience Store yang pernah bekerja sama dengan JKT48 pada lagu Yuuhi wo Miteiruka",
    options: [
      "Lawson",
      "7-Eleven",
      "Minispot",
      "Family Mart"
    ],
    answer: "Lawson",
    difficulty: "sedang",
    "createdAt": "2025-06-16T14:45:53.019Z"
  },
  {
    question: "Jika Nyi Ageng Serang adalah yang pertama, maka yang kedua adalah?",
    options: [
      "FX Sudirman",
      "Pasaraya Blok M",
      "Pasaraya Manggarai",
      "Pasaraya Senayan"
    ],
    answer: "Pasaraya Blok M",
    difficulty: "sulit",
    "createdAt": "2025-06-16T14:49:24.687Z"
  },
  {
    question: "\"Kalian Ngomong Apa Saya Ga Ngerti\" adalah dialog opening pada lagu?",
    options: [
      "Ue Kara Melody",
      "Kimi wa Melody",
      "Kitagawa Kenji",
      "New Ship"
    ],
    answer: "New Ship",
    difficulty: "sedang",
    "createdAt": "2025-06-16T14:51:06.324Z"
  },
  {
    question: "Noella Sisterina - Lidya Maulida Djuhandar - ....?",
    options: [
      "Rona Anggraeni",
      "Nadila Cindi Wantari",
      "Ratu Vienny Fitrilya",
      "Viviyona Apriyani"
    ],
    answer: "Viviyona Apriyani",
    difficulty: "sulit",
    "createdAt": "2025-06-16T14:54:09.132Z"
  },
  {
    question: "Trainee termuda yang pernah ada di JKT48 (per-gen 13 dibentuk)",
    options: [
      "Humaira Ramadhani",
      "Jazzlyn Trisha",
      "Nabilah Ratna Ayu Azalia",
      "Caithlyn Gwyneth"
    ],
    answer: "Caithlyn Gwyneth",
    difficulty: "sulit",
    "createdAt": "2025-06-16T15:00:03.245Z"
  },
  {
    question: "Off Air atau DEBUT JKT48 pertama kali adalah di",
    options: [
      "Inbox SCTV Pulogadung Trade Center",
      "100% Ampuh Bekasi Square",
      "AKB48 kouhaku taikou utagassen Tokyo Dome",
      "100% Ampuh Pasaraya Manggarai "
    ],
    answer: "100% Ampuh Bekasi Square",
    difficulty: "sulit",
    "createdAt": "2025-06-16T15:14:56.390Z"
  },
  {
    question: "Saat masih menjadi member, siapa yang memiliki nama panggilan Wawa?",
    options: [
      "Sonia Natalia",
      "Gabriella Margareth Warouw",
      "Nabilah Ratna Ayu Azalia",
      "Sonya Pandarmawan"
    ],
    answer: "Sonia Natalia",
    difficulty: "sulit",
    "createdAt": "2025-06-16T15:18:56.033Z"
  },
  {
    question: "Trainee dengan masa bakti paling lama sebelum dipromosikan ke team adalah?",
    options: [
      "Gabriela Margareth Warouw",
      "Gabryela Marcelina",
      "Jessica Chandra",
      "Gita Sekar Andarini"
    ],
    answer: "Gabryela Marcelina",
    difficulty: "sulit",
    "createdAt": "2025-06-16T15:27:04.746Z"
  },
  {
    question: "\"Kalau ga ada ........... Jeketi udah bubar\"",
    options: [
      "Restrukturisasi",
      "Devils Attack",
      "Senbatsu Sousenkyo",
      "K3poin Oshi"
    ],
    answer: "Devils Attack",
    difficulty: "sulit",
    "createdAt": "2025-06-16T15:29:54.552Z"
  },
  {
    question: "Pada tanggal 4 Oktober 2013, Rangga Pranendra membuat acara musik yang bertajuk #JKT4okto8er di Antasari, Jakarta Selatan. Siapakah yang membawakan Heart Gata Virus?",
    options: [
      "Rookie Boom",
      "Rangga Pranendra",
      "SAKA",
      "WiraDiazPatudu"
    ],
    answer: "WiraDiazPatudu",
    difficulty: "sulit",
    "createdAt": "2025-06-16T15:37:36.159Z"
  },
  {
    question: "Lagu Ketiga Setlist Ingin Bertemu",
    options: [
      "Boneka yang sedang sedih",
      "Air Mata Shounan",
      "Revolusi Rio",
      "Aitakatta"
    ],
    answer: "Aitakatta",
    difficulty: "mudah",
    "createdAt": "2025-06-16T15:38:06.442Z"
  },
  {
    question: "Diterima di JKT48 - Resign - Audisi Cherrybelle - Menjadi member Princess (girlband Kevin Aprilio)",
    options: [
      "Allisa Astri",
      "Fahira",
      "Intania Pratama Ilham",
      "Siti Gayatri"
    ],
    answer: "Siti Gayatri",
    difficulty: "sulit",
    "createdAt": "2025-06-16T15:42:44.363Z"
  },
  {
    question: "Sensei koreografer JKT48 pertama adalah?",
    options: [
      "Ari Tulang",
      "Iin Waode",
      "Gitgitcha",
      "RInintha Pradiza"
    ],
    answer: "Gitgitcha",
    difficulty: "sulit",
    "createdAt": "2025-06-16T15:56:22.652Z"
  },
  {
    question: "Seifuku Jamaika (American Pop) pertama kali digunakan di acara?",
    options: [
      "Rakuten Expo Jakarta",
      "Kaskus 13th Anniversary Jelajah TKP",
      " Euro RCTI 2012",
      "RCTI Konser Super Dahsyat "
    ],
    answer: "Kaskus 13th Anniversary Jelajah TKP",
    difficulty: "sulit",
    "createdAt": "2025-06-16T16:09:26.107Z"
  },
  {
    question: "Viny -Yona",
    options: [
      "Itoshisa no Defense",
      "Kinjirareta Futari",
      "Temodemo no Namida",
      "Higurashi no Koi"
    ],
    answer: "Kinjirareta Futari",
    difficulty: "sedang",
    "createdAt": "2025-06-16T16:16:04.346Z"
  },
  {
    question: "Haruka Nakagawa - Sinka Juliani - Martha Graciela - ....",
    options: [
      "Syahfira Angela Nurhaliza",
      "Shani Indira Natio",
      "Michelle Christo Kusnadi",
      "Shinta Naomi"
    ],
    answer: "Syahfira Angela Nurhaliza",
    difficulty: "sulit",
    "createdAt": "2025-06-16T16:18:38.274Z"
  },
  {
    question: "AAAHHHH~ FIRE FIRE FIRE FIRE!!!",
    options: [
      "Entah darimana kepalan tangan seakan terangkat tinggi",
      "Bunga di tepi jalan untuk siapakah dia tumbuh dan berkembang",
      "We are The Team J, Sang Pioneer Majulah Team J, harus percaya",
      "Menonton secara langsung, baguskah? Baguskah? Jaraknya terlalu dekat pasti oh my god, 'kan?"
    ],
    answer: "Bunga di tepi jalan untuk siapakah dia tumbuh dan berkembang",
    difficulty: "sulit",
    "createdAt": "2025-06-16T16:32:37.323Z"
  },
  {
    question: "Apakah hadiah utama dari event Scavenger Hunt JKT48 2012 di Plaza Senayan?",
    options: [
      "Uchiwa, Shashin, Lightstick, Poster, Bendera masing masing satu dan bertandatangan member",
      "1 Free Pass Theater JKT48",
      "3 buah All Members Handshake Festival Ticket di Balai Sarbini",
      "4 buah T-Shirt bertandatangan member"
    ],
    answer: "4 buah T-Shirt bertandatangan member",
    difficulty: "sulit",
    "createdAt": "2025-06-16T16:39:22.723Z"
  },
  {
    question: "Siapakah yang berprofesi sebagai Sportscaster setelah lulus dari JKT48?",
    options: [
      "Lidya Maulida Djuhandar",
      "Devi Kinal Putri",
      "Jennifer Hanna Sutiono",
      "Noella Sisterina"
    ],
    answer: "Noella Sisterina",
    difficulty: "sedang",
    "createdAt": "2025-06-16T16:41:56.336Z"
  },
  {
    question: "Apa nama ibu kota Sulawesi Tengah? ",
    options: [
      "Palu",
      "Makassar",
      "Manado",
      "Gorontalo"
    ],
    answer: "Palu",
    difficulty: "sedang",
    "createdAt": "2025-06-16T16:55:16.533Z"
  },
  {
    question: "jika 4 adalah Beach Sandal, dan 10 adalah Rasanya Malas, maka 7 adalah...",
    options: [
      "Betapa Indahnya Dunia Tempat Kita Lahir",
      "Dua Orang yang Terlarang",
      "Rasa Sayang yang Dulu Aku Remehkan",
      "Pada Malam yang Berbadai"
    ],
    answer: "Pada Malam yang Berbadai",
    difficulty: "sulit",
    "createdAt": "2025-06-16T17:09:39.939Z"
  },
  {
    question: "Tempat JKT48 Gen 1 pertama berlatih",
    options: [
      "FX Sudirman F6",
      "Aula Serbaguna Japanese Foundation Sudirman",
      "Taman Kridaloka",
      "Dentsu HQ"
    ],
    answer: "Taman Kridaloka",
    difficulty: "sulit",
    "createdAt": "2025-06-16T17:18:54.827Z"
  },
  {
    question: "Nadila Cindy Wantari, Rona Anggraeni, Sisca Saras, ....",
    options: [
      "Jennifer Hanna Sutiono",
      "Ni Made Ayu Aurellia",
      "Ratu Vienny Fitrilya",
      "Noella Sisterina"
    ],
    answer: "Ni Made Ayu Aurellia",
    difficulty: "sulit",
    "createdAt": "2025-06-16T17:21:18.094Z"
  },
  {
    question: "Nama panggilan Virgi saat dirumah",
    options: [
      "Astrella",
      "Virgi",
      "Nanda",
      "Bebi"
    ],
    answer: "Bebi",
    difficulty: "sulit",
    "createdAt": "2025-06-16T17:22:53.074Z"
  },
  {
    question: "River - Boku no Taiyou - Iiwake Maybe - ....?",
    options: [
      "Mirai ga Me ni Shimiru",
      "Everyday Kachuusha",
      "Heavy Rotation",
      "Soramimi Rock"
    ],
    answer: "Soramimi Rock",
    difficulty: "sulit",
    "createdAt": "2025-06-16T17:26:02.287Z"
  },
  {
    question: "Nama asli Rider-san adalah ...",
    options: [
      "Sakai Mikio",
      "Yosuke Hanamura",
      "Fukuhara Hirofumi",
      "Yuki Makoto"
    ],
    answer: "Fukuhara Hirofumi",
    difficulty: "sulit",
    "createdAt": "2025-06-16T17:36:04.101Z"
  },
  {
    question: "Member dengan jumlah show terbanyak sepanjang 2024 adalah ...",
    options: [
      "Jessica Chandra",
      "Freya Jayawardhana",
      "Chelsea Davina",
      "Grace Octaviani"
    ],
    answer: "Chelsea Davina",
    difficulty: "sedang",
    "createdAt": "2025-06-16T17:40:42.242Z"
  },
  {
    question: "Member reguler aktif yang belum tampil kembali di setlist Ramune no Nomikata semenjak Mei 2023 (per 17 juni 2025) adalah ...",
    options: [
      "Feni Fitriyanti",
      "Amanda Sukma",
      "Shania Gracia",
      "Alya Amanda"
    ],
    answer: "Amanda Sukma",
    difficulty: "sulit",
    "createdAt": "2025-06-16T17:45:32.076Z"
  },
  {
    question: "Siapakah member yang pernah membawakan sendirian unit song yang harusnya terdiri dari 4 orang?",
    options: [
      "Melody Nurramdhani ",
      "Shani Indira Natio",
      "Cindy Yuvia",
      "Ratu Vienny Fitrilya"
    ],
    answer: "Ratu Vienny Fitrilya",
    difficulty: "sulit",
    "createdAt": "2025-06-16T17:52:57.090Z"
  },
  {
    question: "Siapa pemenang kompetisi janken JKT48?",
    options: [
      "Melody Nuramdhani Laksani",
      "Shani Indira Natio",
      "Sinka Juliani",
      "Nabilah Ayu Ratna"
    ],
    answer: "Sinka Juliani",
    difficulty: "mudah",
    "createdAt": "2025-06-17T01:49:09.343Z"
  },
  {
    question: "Disebut apakah figura yang memuat foto member JKT48 dan ditempatkan pada dinding Theater JKT48?",
    options: [
      "Kareha",
      "kabesha",
      "kanakute",
      "kamisama"
    ],
    answer: "kabesha",
    difficulty: "mudah",
    "createdAt": "2025-06-17T01:52:28.980Z"
  },
  {
    question: "Hingga generasi 13 JKT48, generasi mana yang sudah habis duluan?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    answer: "2",
    difficulty: "sulit",
    "createdAt": "2025-06-17T01:59:45.782Z"
  },
  {
    question: "Apa nama event untuk menampilkan 30 lagu oleh member JKT48 yang divote oleh fans?",
    options: [
      "Anniversary concert",
      "Janken competition",
      "Request Hour",
      "Senbatsu Sousenkyo"
    ],
    answer: "Request Hour",
    difficulty: "sedang",
    "createdAt": "2025-06-17T02:04:17.841Z"
  },
  {
    question: "Manakah dibawah ini, yang pernah menjabat sebagai team Photographer JKT48?",
    options: [
      "Gita Chandraswari (gitgitcha) & Fay Ismail (168fayismail)",
      "Resky Ramadhan (the.1993) & Cakti Prawirabishma (CaktiRawks)",
      "Adnan (ADN Stage) & Prasetyo Genta (pgenta)",
      "Narendra Kameshwara (Nareend) & Geri Laksamana (gerilaksamana)"
    ],
    answer: "Resky Ramadhan (the.1993) & Cakti Prawirabishma (CaktiRawks)",
    difficulty: "sulit",
    "createdAt": "2025-06-17T02:05:00.480Z"
  },
  {
    question: "JKT48 Trainee diubah namanya menjadi JKT48 Academy Class A & B dimulai sejak generasi berapa?",
    options: [
      "5",
      "6",
      "7",
      "8"
    ],
    answer: "6",
    difficulty: "sulit",
    "createdAt": "2025-06-17T02:06:11.056Z"
  },
  {
    question: "Di bawah ini, manakah yang tidak termasuk event Ramadhan theater JKT48?",
    options: [
      "Karate ya benar",
      "Share house 48",
      "Sahur bowl",
      "JKT48 School"
    ],
    answer: "Sahur bowl",
    difficulty: "mudah",
    "createdAt": "2025-06-17T02:10:24.078Z"
  },
  {
    question: "Disebut apakah musik pembuka sebelum para member JKT48 naik ke atas panggung?",
    options: [
      "Overwatch",
      "Overture",
      "Overrated",
      "Overtune"
    ],
    answer: "Overture",
    difficulty: "mudah",
    "createdAt": "2025-06-17T02:12:53.429Z"
  },
  {
    question: "Pada masa JKT48 Academy class A & B, siapa yang menjadi kepala sekolahnya?",
    options: [
      "Melody Nurramdani Laksani",
      "Haruka nakagawa",
      "Devi Kinal Putri",
      "Shania Junianatha"
    ],
    answer: "Devi Kinal Putri",
    difficulty: "sulit",
    "createdAt": "2025-06-17T02:14:26.510Z"
  },
  {
    question: "Manakah pasangan Member - Unit Song dibawah ini, yang belum pernah terjadi sama sekali?",
    options: [
      "Feni Fitriyanti - Ame no Pianist",
      "Shani Indira Natio - Tsundere",
      "Shania Gracia - Tenshi no Shippo",
      "Jessica Chandra - Temodemo no Namida"
    ],
    answer: "Feni Fitriyanti - Ame no Pianist",
    difficulty: "sulit",
    "createdAt": "2025-06-17T02:15:16.276Z"
  },
  {
    question: "Apa judul single janken competition JKT48?",
    options: [
      "So long",
      "Saikou kayo",
      "Mae shika mukanee",
      "Love trip"
    ],
    answer: "Love trip",
    difficulty: "sedang",
    "createdAt": "2025-06-17T02:16:24.908Z"
  },
  {
    question: "Nobita pernah menjadi nama panggilan seorang member. Member tersebut berasal dari generasi?",
    options: [
      "Generasi 1",
      "Generasi 2",
      "Generasi 3",
      "Generasi 4"
    ],
    answer: "Generasi 2",
    difficulty: "sulit",
    "createdAt": "2025-06-17T02:16:51.577Z"
  },
  {
    question: "Pada saat aktif sebagai member JKT48, Della Delila, Saktia Oktapyani dan Priscilla Sari Dewi pernah membentuk sebuah video project/gimmick/grup dengan nama?",
    options: [
      "Devils Defend",
      "Devils Attack",
      "Devils May Cry",
      "Devils Group"
    ],
    answer: "Devils Attack",
    difficulty: "sulit",
    "createdAt": "2025-06-17T02:23:37.240Z"
  },
  {
    question: "Siapakah 2 member yang bergantian mengisi posisi global center setlist Tadaima Renaichuu?",
    options: [
      "Melody Nurramdhani & Shania Junianatha",
      "Rona Anggraeni & Haruka Nakagawa",
      "Thalia Ivanka & Nabilah Ayu Azalia",
      "Jessica Veranda & Ratu Vienny Fitrilya"
    ],
    answer: "Thalia Ivanka & Nabilah Ayu Azalia",
    difficulty: "sulit",
    "createdAt": "2025-06-17T02:25:05.054Z"
  },
  {
    question: "Disebut apakah event JKT48 untuk mengunjungi beberapa kota pada tahun 2018-2019?",
    options: [
      "JKT48 Parade",
      "JKT48 Meet and Greet",
      "JKT48 Circus",
      "JKT48 Tour"
    ],
    answer: "JKT48 Circus",
    difficulty: "sedang",
    "createdAt": "2025-06-17T02:30:27.008Z"
  },
  {
    question: "Siapakah yang menjadi lawan terakhir Sinka Juliani pada event JKT48 Janken Competition 2016?",
    options: [
      "Viviyona Apriani",
      "Ni Made Aurellia",
      "Nadhifa Salsabila",
      "Jennifer Rachel Natasya"
    ],
    answer: "Ni Made Aurellia",
    difficulty: "sedang",
    "createdAt": "2025-06-17T02:32:36.300Z"
  },
  {
    question: "Pada generasi JKT48 berapa yang terdapat member dengan usia termuda sepanjang sejarah JKT48 pada saat diperkenalkan?",
    options: [
      "7",
      "9",
      "11",
      "13"
    ],
    answer: "9",
    difficulty: "sulit",
    "createdAt": "2025-06-17T02:35:08.466Z"
  },
  {
    question: "Paw-Paw adalah nama panggilan dari member?",
    options: [
      "Sonia Natalia",
      "Cindy Yuvia",
      "Aninditha Rahma Cahyadi",
      "Nadila Cindi Wantari"
    ],
    answer: "Nadila Cindi Wantari",
    difficulty: "sulit",
    "createdAt": "2025-06-17T02:35:42.868Z"
  },
  {
    question: "Manakah diantara member-member dibawah ini, yang pernah masuk di seluruh 3 sistem Senbatsu? (SSK, Manajemen, Janken)",
    options: [
      "Feni Fitriyanti",
      "Shani Indira Natio",
      "Shania Gracia",
      "Melody Nurramdhani"
    ],
    answer: "Feni Fitriyanti",
    difficulty: "sulit",
    "createdAt": "2025-06-17T02:41:47.498Z"
  },
  {
    question: "Thacil adalah nama panggilan untuk member?",
    options: [
      "Tan Zhi Hui Celine",
      "Thalia Ivanka",
      "Thalia",
      "Natalia"
    ],
    answer: "Thalia Ivanka",
    difficulty: "sulit",
    "createdAt": "2025-06-17T02:46:43.428Z"
  },
  {
    question: "Manakah di bawah ini hubungan kakak & adik kandung yang tidak pernah satu stage saat statusnya member aktif?",
    options: [
      "Melody Nurramdhani & Frieska Anastasia",
      "Stephanie Pricilla & Kathrina Irene",
      "Caithlyn Gwyneth & Christabel Jocelyn",
      "Eve Antoinette & Ariella Calista"
    ],
    answer: "Stephanie Pricilla & Kathrina Irene",
    difficulty: "sulit",
    "createdAt": "2025-06-17T02:47:08.341Z"
  },
  {
    question: "Manakah diantara member-member dibawah ini yang tidak hadir baik menjadi performer maupun menjadi penonton stage di 10th Anniversary HEAVEN 2022?",
    options: [
      "Ratu Vienny Fitrilya",
      "Rena Nozawa",
      "Stella Cornelia",
      "Cleopatra Djapri"
    ],
    answer: "Stella Cornelia",
    difficulty: "sulit",
    "createdAt": "2025-06-17T02:54:37.386Z"
  },
  {
    question: "Pada masanya, manakah di bawah ini yang dalam satu waktu menjadi member aktif pada tim J, K3, dan T?",
    options: [
      "Melody Nurramdani",
      "Tan Zhi Hui Celine",
      "Aninditha Rahma",
      "Shani Indira"
    ],
    answer: "Aninditha Rahma",
    difficulty: "sedang",
    "createdAt": "2025-06-17T02:56:51.734Z"
  },
  {
    question: "Perayaan ulang tahun member JKT48 pada akhir pertunjukan theater JKT48 disebut dengan?",
    options: [
      "Seisantai",
      "Setiansai",
      "Setainsi",
      "Seitansai"
    ],
    answer: "Seitansai",
    difficulty: "mudah",
    "createdAt": "2025-06-17T03:01:00.164Z"
  },
  {
    question: "Manakah di bawah ini yang bukan tim esports JKT48 pada ajang JKT48 Internal Qualifiers tournament Pokemon Go Battle Festival 2021?",
    options: [
      "Valkyrie 48",
      "Andromeda 48",
      "Amazon 48",
      "Apsara 48"
    ],
    answer: "Andromeda 48",
    difficulty: "sulit",
    "createdAt": "2025-06-17T03:06:41.533Z"
  },
  {
    question: "Kalo kata Kathrina generasi 9, \"Teng teng apa yang sedih?\"",
    options: [
      "Tengkyu en gudbai",
      "Tengkyu ol",
      "Tengkyu for de memoris",
      "Tengkyu en hepi nyu yer"
    ],
    answer: "Tengkyu for de memoris",
    difficulty: "sulit",
    "createdAt": "2025-06-17T03:10:27.445Z"
  },
  {
    question: "Pada suatu waktu, pernah ada suatu grup yang diisi oleh ex member JKT48 dan calon member JKT48, manakah yang tidak termasuk?",
    options: [
      "Aurel Mayori",
      "Nina Tutachia",
      "Michelle Levia",
      "Grace Octaviani"
    ],
    answer: "Nina Tutachia",
    difficulty: "sulit",
    "createdAt": "2025-06-17T03:13:35.808Z"
  },
  {
    question: "Pada tahun 2020, JKT48 membuka audisi JKT48 generasi 10 dan proses audisinya ditayangkan di mana?",
    options: [
      "Showroom",
      "RCTI+",
      "IDN Live",
      "Youtube Channel JKT48"
    ],
    answer: "RCTI+",
    difficulty: "sedang",
    "createdAt": "2025-06-17T03:15:53.438Z"
  },
  {
    question: "Lagu Petak Umpet Romansa ditampilkan oleh?",
    options: [
      "Under Girls",
      "Zenza Girls",
      "Upcoming Girls",
      "Senbatsu Girls"
    ],
    answer: "Zenza Girls",
    difficulty: "sedang",
    "createdAt": "2025-06-17T03:19:53.793Z"
  },
  {
    question: "Pada masanya, Shania Gracia pernah membuat project vidio bersama Elaine Hartanto dan Sofia Meifaliani, apa namanya?",
    options: [
      "Girls Project",
      "Sister Project",
      "Trio Project",
      "Ladies Project"
    ],
    answer: "Sister Project",
    difficulty: "sulit",
    "createdAt": "2025-06-17T03:22:02.188Z"
  },
  {
    question: "Siapakah member yang memutuskan menggunakan namanya sendiri (di stage) ketimbang menggunakan nama panggungnya, dengan alasan tanggung jawabnya2 sangatlah besar?",
    options: [
      "Dena Natalia (Danella)",
      "Ayana Shahab (Achan)",
      "Cindy Yuvia (Cindvia - Yuvia)",
      "Cindy Nugroho (Nunu)"
    ],
    answer: "Ayana Shahab (Achan)",
    difficulty: "sulit",
    "createdAt": "2025-06-17T03:24:07.851Z"
  },
  {
    question: "Siapakah yang menjadi duet partner Melody pada lagu Sebagian Besar Kenangan dalam acara Melody Graduation Concert?",
    options: [
      "Haruka Nakagawa",
      "Jessica Veranda",
      "Nabilah Ratna Ayu Azalia",
      "Shania Junianatha"
    ],
    answer: "Shania Junianatha",
    difficulty: "sulit",
    "createdAt": "2025-06-17T03:27:58.438Z"
  },
  {
    question: "Di tahun 2013, JKT48 merilis sebuah Photobook. Format dari photobook tersebut adalah?",
    options: [
      "Calendar Book",
      "Official Guide Book",
      "Mook (Magazine Book)",
      "Season Greeting Photobook"
    ],
    answer: "Official Guide Book",
    difficulty: "sulit",
    "createdAt": "2025-06-17T03:41:53.404Z"
  },
  {
    question: "Manakah lagu di bawah ini yang tidak dibawakan oleh satu orang?",
    options: [
      "Pundak Kanan",
      "Perbuatan Angin Malam",
      "Bukan Alpukat",
      "Balada Serangga"
    ],
    answer: "Bukan Alpukat",
    difficulty: "sedang",
    "createdAt": "2025-06-17T03:50:16.414Z"
  },
  {
    question: "Manakah di bawah ini yang tidak terdapat nama \"Abigail\" pada nama lengkap member JKT48?",
    options: [
      "Lily",
      "Ella",
      "Erin",
      "Aralie"
    ],
    answer: "Erin",
    difficulty: "mudah",
    "createdAt": "2025-06-17T03:52:49.725Z"
  },
  {
    question: "Manakah di bawah ini member JKT48 yang tidak ikut menonton pertandingan sepakbola antara Indonesia vs Filipina di Stadion GBK Juni 2024?",
    options: [
      "Gita",
      "Greesel",
      "Lia",
      "Oniel"
    ],
    answer: "Oniel",
    difficulty: "sulit",
    "createdAt": "2025-06-17T03:59:45.732Z"
  },
  {
    question: "Manakah di bawah ini yang pernah menjadi bagian dari Valkyrie48?",
    options: [
      "Erika Ebisawa",
      "Adhisty Zara",
      "Syahfira Angela",
      "Aurel Mayori"
    ],
    answer: "Syahfira Angela",
    difficulty: "sedang",
    "createdAt": "2025-06-17T04:08:44.416Z"
  },
  {
    question: "Pada program iClub48, manakah di bawah ini yang tidak mendapatkan tantangan untuk memasuki/mengikuti camp militer?",
    options: [
      "Sisca",
      "Feni",
      "Okta",
      "Desy"
    ],
    answer: "Sisca",
    difficulty: "sulit",
    "createdAt": "2025-06-17T04:12:00.558Z"
  },
  {
    question: "Manakah di bawah ini yang tidak memiliki nama \"Jessica\" pada nama lengkap nya?",
    options: [
      "Jessi",
      "Jeje",
      "Veranda",
      "Gracia"
    ],
    answer: "Gracia",
    difficulty: "mudah",
    "createdAt": "2025-06-17T04:20:05.647Z"
  },
  {
    question: "Siapakah member yang tweetnya pernah dibalas oleh The Rock?",
    options: [
      "Della Delila",
      "Melati Putri Sesilia",
      "Delima Rizky",
      "Puti Nadhira"
    ],
    answer: "Delima Rizky",
    difficulty: "sulit",
    "createdAt": "2025-06-17T04:21:16.175Z"
  },
  {
    question: "Manakah di bawah ini yang tidak terdapat nama \"Cindy\" pada nama lengkapnya?",
    options: [
      "Yupi",
      "Cigul",
      "Muthe",
      "Nunu"
    ],
    answer: "Muthe",
    difficulty: "mudah",
    "createdAt": "2025-06-17T04:22:46.134Z"
  },
  {
    question: "Pada masanya, Viviyona Apriyani dan Lidya Maulida pernah membuat vidio projek yang diunggah di channel Youtube JKT48, apa nama projek nya?",
    options: [
      "K3poin Oshi",
      "K3poin Member JKT48",
      "K3poin Kita",
      "K3poin K3poin"
    ],
    answer: "K3poin Oshi",
    difficulty: "sulit",
    "createdAt": "2025-06-17T04:29:18.891Z"
  },
  {
    question: "Setiap bulan, pada media sosial X, para fans JKT48 meraimaikan tagar jeketiselcaday, setiap tanggal berapa?",
    options: [
      "16",
      "17",
      "18",
      "19"
    ],
    answer: "17",
    difficulty: "sedang",
    "createdAt": "2025-06-17T04:37:56.272Z"
  },
  {
    question: "Setiap bulan, di media sosial X, para fans JKT48 ramai-ramai memberikan apresiasi pada oshinya, pada tanggal berapa?",
    options: [
      "21",
      "22",
      "23",
      "24"
    ],
    answer: "21",
    difficulty: "sedang",
    "createdAt": "2025-06-17T04:41:25.595Z"
  },
  {
    question: "asd",
    options: [
      "c",
      "a",
      "dc",
      "c"
    ],
    answer: "a",
    difficulty: "sedang",
    "createdAt": "2025-06-17T07:41:58.637Z"
  },
  {
    question: "\"INDONESIA'S MOST SOPHISTICATED SHOW. PRESENTED BY THE JKT48 & 48 GIRLS\".\nAdalah Marquee Display yang berisi tagline dari JKT48 Theater, di JKT48 Theater FX Sudirman. \nPada saat pembukaan hari pertama JKT48 Theater FX Sudirman, ada satu kata di marquee display tersebut yang typo dan esok harinya langsung diganti, kata apakah tersebut?",
    options: [
      "SHOPHISTICATED",
      "SOHW",
      "PERSENTED",
      "MOTS"
    ],
    answer: "SHOPHISTICATED",
    difficulty: "sulit",
    "createdAt": "2025-06-17T07:54:26.505Z"
  },
  {
    question: "Apa profesi dari Rezza Habibie sebelum menjadi staff dokumentasi JKT48?",
    options: [
      "Railfans",
      "Pegawai PT. KAI",
      "Professional Photographer Artist",
      "Staff Reska PT. KAI"
    ],
    answer: "Pegawai PT. KAI",
    difficulty: "sulit",
    "createdAt": "2025-06-17T08:03:57.401Z"
  },
  {
    question: "Chery Meiriawati kembali ke JKT48, setelah sebelumnya pernah menjadi Vocal Coach pada tahun 2013. Beliau mempunyai jobdesc sebagai Vocal Coach, Vocal Director, sekaligus Backing Vocal pada lagu lagu JKT48 pada tahun tersebut dan 2021 keatas.  Sebelum kak Chery, siapakah Vocal Coach JKT48?",
    options: [
      "Yola Theodora",
      "Venessa Koespramanto",
      "Putriasihta Baeha",
      "Annisa Pontjo"
    ],
    answer: "Annisa Pontjo",
    difficulty: "sulit",
    "createdAt": "2025-06-17T08:23:10.356Z"
  },
  {
    question: "Istilah untuk trainee yang menjadi performer sebagai pembuka pertunjukan Theater",
    options: [
      "Senbatsu",
      "Request Hour",
      "Zenza Girls",
      "Undergirls"
    ],
    answer: "Zenza Girls",
    difficulty: "sedang",
    "createdAt": "2025-06-17T08:40:27.841Z"
  },
  {
    question: "Manakah diantara pernyataan dibawah yang benar?",
    options: [
      "Fay Ismail adalah Music Director JKT48 dengan masa jabatan hanya di era Heavy Rotation.",
      "Gatri \"Gitgitcha\" Chandraswari, Iin Waode, Rendy White, Arif Surrahman adalah sensei aktif sampai saat ini (2025)",
      "Resky Ramadhan (the.1993) dan Novaro Wisnu Wardana pernah menjadi staff dokumentasi JKT48",
      "Annisa Pontjo adalah Vocal Coach JKT48 dengan masa jabatan tersingkat"
    ],
    answer: "Resky Ramadhan (the.1993) dan Novaro Wisnu Wardana pernah menjadi staff dokumentasi JKT48",
    difficulty: "sulit",
    "createdAt": "2025-06-17T08:42:54.846Z"
  },
  {
    question: "Pada lagu atau single apa Melody Nurramdhani Laksani pertama kali menjalankan tugasnya sebagai General Manager JKT48?",
    options: [
      "Love Trip",
      "High Tension",
      "Rapsodi",
      "Everyday Kachuusha / UZA"
    ],
    answer: "Everyday Kachuusha / UZA",
    difficulty: "sulit",
    "createdAt": "2025-06-17T08:48:24.161Z"
  },
  {
    question: "Official Guide Book JKT48 terdiri dari berapa seri?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    answer: "2",
    difficulty: "sulit",
    "createdAt": "2025-06-17T08:49:55.092Z"
  },
  {
    question: "Siapakah member di bawah ini yang pernah menjadi Junjou Merah?",
    options: [
      "Cindy Yuvia",
      "Rena Nozawa",
      "Rica Leyona",
      "Ghaida Farisya"
    ],
    answer: "Ghaida Farisya",
    difficulty: "sulit",
    "createdAt": "2025-06-17T08:58:01.205Z"
  },

  {
    question: "Siapa center pada mv 'Ponytail to Shushu' versi JKT48?",
    options: ["Shani", "Melody", "Zee", "Gaby"],
    answer: "Zee",
    difficulty: "mudah",
  },
  {
    question: "Kapan JKT48 pertama kali dibentuk?",
    options: ["2010", "2011", "2012", "2013"],
    answer: "2011",
    difficulty: "mudah",
  },
  {
    question: "Apa warna khas Team KIII?",
    options: ["Merah", "Kuning", "Hijau", "Ungu"],
    answer: "Kuning",
    difficulty: "mudah",
  },
  {
    question: "Lagu 'River' termasuk dalam single keberapa JKT48?",
    options: ["1", "2", "3", "4"],
    answer: "1",
    difficulty: "mudah",
  },
  {
    question: "Siapa member yang dikenal dengan julukan 'Sempurna'?",
    options: ["Melody", "Shani", "Gaby", "Yupi"],
    answer: "Shani",
    difficulty: "mudah",
  },
  {
    question: "Apa nama teater JKT48?",
    options: ["JKT48 Dome", "JKT48 Theater", "JKT48 Hall", "JKT48 House"],
    answer: "JKT48 Theater",
    difficulty: "mudah",
  },
  {
    question: "Lagu 'Fortune Cookie yang Mencinta' adalah adaptasi dari grup mana?",
    options: ["AKB48", "NMB48", "HKT48", "BNK48"],
    answer: "AKB48",
    difficulty: "mudah",
  },
  {
    question: "Siapa member pertama yang menjadi GM (General Manager) JKT48?",
    options: ["Melody", "Stella", "Nabilah", "Haruka"],
    answer: "Melody",
    difficulty: "mudah",
  },
  {
    question: "Apa nama sistem pemilihan member populer JKT48?",
    options: ["Janken", "Sousenkyo", "Handshake", "Election"],
    answer: "Sousenkyo",
    difficulty: "mudah",
  },
  {
    question: "Siapa center pada lagu 'Rapsodi' ?",
    options: ["Shani", "Zara", "Freya", "Melody"],
    answer: "Shani",
    difficulty: "mudah",
  },
  {
    question: "Unit lagu 'Candy' dibawakan dalam setlist apa?",
    options: ["Renai Kinshi Jourei", "Dewi Theater", "Tadaima Renaichuu", "Seishun Girls"],
    answer: "Dewi Theater",
    difficulty: "mudah",
  },
  {
    question: "Berapa jumlah generasi resmi JKT48 per 2025?",
    options: ["10", "11", "12", "13"],
    answer: "13",
    difficulty: "mudah",
  },
  {
    question: "Siapa member pertama dari JKT48 yang lulus?",
    options: ["Cleo", "Stella", "Melody", "Beby"],
    answer: "Cleo",
    difficulty: "mudah",
  },
  {
    question: "Apa judul lagu original pertama JKT48?",
    options: ["Rapsodi", "Hanya Lihat ke Depan", "Luar Biasa", "Pajama Drive"],
    answer: "Rapsodi",
    difficulty: "mudah",
  },
  {
    id: 301,
    type: "image-blur",
    prompt: "Siapakah member JKT48 pada gambar blur berikut?",
    image: "/images/jkt48/shani.jpg",
    options: ["Shani", "Freya", "Feni", "Eli"],
    answer: "Shani",
    difficulty: "sulit",
  }
];

export default questions;
