
import { Server as HTTPServer } from "http";
import { Server } from "socket.io";

let io: Server;
export const initiateSocket = (server: HTTPServer) => {
  io = new Server(server, {
    cors: {
      credentials: true,
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "PATCH"],
    },
    transports: ["websocket", "polling"],
  });

   io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    // --------handle join room------
    socket.on("join-room", (room , selfUserId) => {
      socket.join(room);
      socket.emit("room-joined", room , selfUserId);
      console.log(`room no :  ${room}  socket id  ${socket.id}`);
    });
    // --------handle send messages-------
    socket.on("send-message", (room, newMessage , selfUserId, receiverId) => {
      console.log("Received message:", newMessage, "for room:", room);
      socket.broadcast.to(room).emit("receive-message", {
        message: newMessage,
        senderId: selfUserId, 
        timestamp: new Date().toISOString(),
      });
      socket.emit("fetch-unread",receiverId);
    });

    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    console.log("socket io prb");
  }
};
