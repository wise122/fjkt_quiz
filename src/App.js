import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Quiz from './screens/PracticeQuiz';
import Versus from './screens/VersusScreen';
import VersusRoom from './screens/VersusRoom';
import SuggestScreen from './screens/SuggestScreen';
import SoloChallenge from './screens/SoloChallenge';
import BattleScreen from './screens/BattleScreen';
import Leaderboard from "./screens/Leaderboard";
import ResultScreen from "./screens/ResultScreen";




function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/versus/matchmaking" element={<Versus />} />
        <Route path="/versus/room/:roomCode" element={<VersusRoom />} />
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
