import io from "socket.io-client";

let socket = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io("https://q.sfinbusinesssolution.net/");
    console.log("✅ Socket Connected");
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
