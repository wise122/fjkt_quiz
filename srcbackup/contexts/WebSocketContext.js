import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const listeners = useRef([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000"); // Sesuaikan dengan backend
    setSocket(ws);

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        listeners.current.forEach((listener) => listener(data));
      } catch (err) {
        console.error("Invalid message", err);
      }
    };

    ws.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  const addListener = (listener) => {
    listeners.current.push(listener);
    return () => {
      listeners.current = listeners.current.filter((l) => l !== listener);
    };
  };

  return (
    <WebSocketContext.Provider value={{ socket, addListener }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
