import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = dev ? "localhost" : "chat.lucasbrum.dev";
const port = dev ? 3000 : 3030;

// Silencia warnings do async_hooks
process.removeAllListeners('warning');

const app = next({ dev, hostname, port, turbo: dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected");

      // Recebe objeto de mensagem do cliente e retransmite para todos
      socket.on("message", (msgObj) => {
        console.log("Message received:", msgObj);
        // Envia para todos os clientes, incluindo quem enviou
        io.emit("message", msgObj);
      });

      // Mensagem de boas-vindas apenas para o cliente conectado
      socket.emit("message", { id: "server", text: "Bem-vindo ao chat!" });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});