import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Quiz from './screens/PracticeQuiz';
import Versus from './screens/VersusScreen';
import VersusRoom from './screens/VersusRoom';
import VersusBattleScreen from './screens/VersusBattleScreen';  // 👉 Tambahan
import VersusResultScreen from './screens/VersusResultScreen';  // 👉 Tambahan
import SuggestScreen from './screens/SuggestScreen';
import SoloChallenge from './screens/SoloChallenge';
import BattleScreen from './screens/BattleScreen';
import Leaderboard from "./screens/Leaderboard";
import ResultScreen from "./screens/ResultScreen";
import { connectSocket } from './socket';

function App() {
  useEffect(() => {
    connectSocket();  // Hanya connect sekali saat pertama load
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/versus/matchmaking" element={<Versus />} />
        <Route path="/versus/room/:roomCode" element={<VersusRoom />} />
        <Route path="/versus/battle/:roomCode" element={<VersusBattleScreen />} />  {/* ✅ Tambahan */}
        <Route path="/versus-result" element={<VersusResultScreen />} /> {/* ✅ Tambahan */}
        <Route path="/suggest" element={<SuggestScreen />} />
        <Route path="/result" element={<ResultScreen />} />
        <Route path="/solo" element={<SoloChallenge />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/battle" element={<BattleScreen />} />
      </Routes>
    </>
  );
}

export default App;
