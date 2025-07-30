import React, { createContext, useContext, useEffect, useState } from "react";
import { connectSocket, disconnectSocket, getSocket } from "../socket";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState(null);

  useEffect(() => {
    connectSocket();
    const socket = getSocket();
    setSocketInstance(socket);

    return () => {
      disconnectSocket();
    };
  }, []);

  if (!socketInstance) {
    // Saat socket belum siap, tampilkan loading
    return <div>Loading koneksi socket...</div>;
  }

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
