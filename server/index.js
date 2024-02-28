import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app); // Creamoa el servidor HTTP
const io = new Server(server,{
  connectionStateRecovery: {
    
  } // Para que se guarde el estado de la conexión
});

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat message", (msg) =>{
    io.emit("chat message", msg); // Emite el mensaje a todos los clientes conectados
  });
});

app.use(logger("dev")); // Loggea cada request en consola

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
