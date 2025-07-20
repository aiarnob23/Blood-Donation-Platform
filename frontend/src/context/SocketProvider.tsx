"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}

const socketContext = createContext<SocketContextType | null>(null);

export const useSocket = (): Socket | null => {
  const context = useContext(socketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context.socket;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const memoizedSocket = useMemo(() => {
    const newSocket = io("https://blood-donation-platform.onrender.com", {
      transports: ["websocket"],
      autoConnect: true,
      query: {
        clientId:
          Date.now().toString() + Math.random().toString(36).substring(2, 15),
      },
    });

    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    return newSocket;
  }, []);

  useEffect(() => {
    setSocket(memoizedSocket);

    return () => {
      if (memoizedSocket) {
        memoizedSocket.disconnect();
      }
    };
  }, [memoizedSocket]);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
