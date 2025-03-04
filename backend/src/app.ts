import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { userRoutes } from "./app/modules/user/user.routes";
import { postRoutes } from "./app/modules/post/post.route";
import { conversationRoutes } from "./app/modules/conversation/conversation.route";

const app: Application = express();

// ---------------------Socket io servier---------------//
const io = new Server(4001, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

// Keep track of connected clients and their information
interface ClientInfo {
  socketId: string;
  clientId: string;
  email?: string;
  rooms: string[];
}

const connectedClients: Record<string, ClientInfo> = {};

// Handle socket connections
io.on("connection", (socket) => {
  // Extract the unique client ID from the connection query
  const clientId = socket.handshake.query.clientId as string;
  console.log(`User connected: ${socket.id} (Client ID: ${clientId})`);
  
  // Store client information
  connectedClients[socket.id] = {
    socketId: socket.id,
    clientId: clientId,
    rooms: []
  };
  
  // Handle room joining
  socket.on("join-room", async (room) => {
    socket.join(room);
    
    // Add room to client's room list
    if (connectedClients[socket.id]) {
      connectedClients[socket.id].rooms.push(room.toString());
    }
    
    console.log(`Client ${socket.id} (${clientId}) joined room ${room}`);
    
    // Notify room members
    io.to(room).emit("joinRoomNavigate", { 
      room, 
      socketId: socket.id,
      clientId: clientId 
    });
    
    // Send details of joined room
    io.to(room).emit("joinedRoomsDetailsPass", { 
      room, 
      socketId: socket.id,
      clientId: clientId,
      connectedUsers: Object.values(connectedClients).filter(client => 
        client.rooms.includes(room.toString())
      )
    });
  });

  // Handle messages
  socket.on("message", (data) => {
    console.log("Received message:", data);
    // Broadcast the message to the specified room or to all clients
    if (data.room) {
      io.to(data.room).emit("message", {
        ...data,
        socketId: socket.id,
        clientId: clientId
      });
    } else {
      io.emit("message", {
        ...data,
        socketId: socket.id,
        clientId: clientId
      });
    }
  });

  // Associate email with client
  socket.on("set-user-email", (email) => {
    if (connectedClients[socket.id]) {
      connectedClients[socket.id].email = email;
      console.log(`Associated email ${email} with socket ${socket.id}`);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id} (Client ID: ${clientId})`);
    // Clean up client info
    delete connectedClients[socket.id];
  });
});

// ---------------Basic backend server----------------------//

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/conversation", conversationRoutes);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Blood donation backend");
});

export default app;