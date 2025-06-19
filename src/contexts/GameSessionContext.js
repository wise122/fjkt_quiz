import React, { createContext, useContext, useState } from "react";

const GameSessionContext = createContext(null);

export const GameSessionProvider = ({ children }) => {
  const [session, setSession] = useState({
    username: "",  // diisi saat login
    avatar: "",
    member: "",
    roomId: null,
    playerId: null,
    isHost: false,
    isMyReady: false,
    opponentReady: false,
    playerName: "",
    playerAvatar: "",
    opponentName: "",
    opponentAvatar: ""
  });

  const resetSession = () => {
    setSession({
      username: "",
      avatar: "",
      member: "",
      roomId: null,
      playerId: null,
      isHost: false,
      isMyReady: false,
      opponentReady: false,
      playerName: "",
      playerAvatar: "",
      opponentName: "",
      opponentAvatar: ""
    });
    localStorage.removeItem("playerId");
  };

  return (
    <GameSessionContext.Provider value={{ session, setSession, resetSession }}>
      {children}
    </GameSessionContext.Provider>
  );
};

export const useGameSession = () => useContext(GameSessionContext);
