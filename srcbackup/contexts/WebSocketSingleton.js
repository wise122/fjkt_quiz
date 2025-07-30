let socket = null;
let listeners = [];

export function getWebSocket() {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    console.log("🆕 Membuat WebSocket baru");
    socket = new WebSocket("ws://localhost:5000/");

    socket.addEventListener("open", () => {
      console.log("✅ WebSocket connected");
    });

    socket.addEventListener("close", () => {
      console.log("❌ WebSocket disconnected");
    });

    socket.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("[RECEIVED]", message);
        listeners.forEach((callback) => callback(message));
      } catch (err) {
        console.error("❌ Error parsing message:", err);
      }
    });

    socket.addEventListener("error", (err) => {
      console.error("❌ WebSocket error:", err);
    });
  } else {
    console.log("♻️ Menggunakan WebSocket lama");
  }
  return socket;
}

export function addWebSocketListener(callback) {
  listeners.push(callback);
}

export function removeWebSocketListener(callback) {
  listeners = listeners.filter((cb) => cb !== callback);
}
