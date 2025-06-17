# 🎮 Quiz Versus JKT48 - React Multiplayer App

Aplikasi web kuis interaktif bertema JKT48 dengan mode 1 vs 1 multiplayer, dilengkapi dengan fitur matchmaking otomatis, room custom, dan leaderboard.

---

## 🚀 Fitur Utama
- 🧠 **Kuis Interaktif**: Soal-soal acak dengan waktu terbatas
- 🆚 **Mode 1 vs 1 Multiplayer** (update)
  - 🔍 *Matchmaking Otomatis*
  - 🎯 *Buat Room Baru* (dengan kode unik)
  - 🚪 *Gabung dengan Kode Room*
  - 📊 **Leaderboard**: Papan skor untuk melihat ranking tertinggi

---

## 🛠️ Teknologi

- ⚛️ React.js (Vite or CRA)
- 💅 Chakra UI
- 📡 Socket.IO *(akan ditambahkan untuk real-time multiplayer)*
- 🔧 React Router DOM

---

## 📁 Struktur Folder

```
src/
├── components/
│   ├── VersusModal.jsx         # Modal pilih mode vs
│  
├── screens/
│   ├── Home.jsx                # Halaman utama
│   ├── VersusRoom.jsx          # Tampilan kode room & status join
│   ├── Leaderboard.jsx         # Papan skor
│   ├── PracticeQuiz.jsx        # Berlatih soal
│   ├── VersusScreen.jsx        # Tampilan Auto Match
│  
├── data/
│   └── questionList.js         # Soal kuis JKT48
└── App.jsx
```

---

## 🧪 Cara Menjalankan

1. Clone repo:

   ```bash
   git clone https://github.com/wise122/fjkt48-quiz.git
   cd fjkt48-quiz
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Jalankan:

   ```bash
   npm start
   ```

4. Buka di browser:
   ```
   http://localhost:3000
   ```

---

## 🔮 Pengembangan Selanjutnya

- [ ] Integrasi **Socket.IO** untuk real-time room & pertandingan
- [ ] Mode **turn-based** dengan timer per soal
- [ ] Statistik pemain (menang/kalah)
- [ ] Admin panel untuk input soal
- [ ] Tema khusus JKT48 dan suara efek

---

## 🧑‍💻 Kontribusi

Pull request dan saran sangat diterima! 💬  
Hubungi melalui X ✨

---

## 📄 Lisensi

MIT License © 2025
