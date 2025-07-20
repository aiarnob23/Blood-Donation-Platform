
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
    // const { userId, role } = socket.handshake.query;
    // console.log(userId, role);
    // if (userId) {
    //   socket.join(userId);
    // }
    // if (role) {
    //   socket.join(role);
    //   console.log(`Socket ${socket.id} joined room : ${role}`);
    // }
    // --------handle join room------
    socket.on("join-room", (room) => {
      socket.join(room);
      socket.emit("room-joined", room);
      console.log(`room no :  ${room}  socket id  ${socket.id}`);
    });
    // --------handle send messages-------
    socket.on("send-message", (room, newMessage , selfUserId) => {
      console.log("Received message:", newMessage, "for room:", room);
      io.to(room).emit("receive-message", {
        message: newMessage,
        senderId: selfUserId, 
        timestamp: new Date().toISOString(),
      });
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
