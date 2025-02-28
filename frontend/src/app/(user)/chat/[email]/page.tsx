"use client";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketProvider";

export default function Chat() {
  const { email } = useParams();
  const decodedEmail = email ? decodeURIComponent(email as string) : null;
  const room = 200; // Room ID
  const socket = useSocket();
const userEmail = Cookies.get("userEmail"); 
  const [selfSocketId, setSelfSocketId] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { msg: string; fromSelf: boolean; sender?: string }[]
  >([]);
  const [connectedUsers, setConnectedUsers] = useState<any[]>([]);

  // Handle joining the room and getting socket ID
  useEffect(() => {
    if (socket) {
      // Set user's email if available
      if (decodedEmail) {
        socket.emit("set-user-email", userEmail);
      }

      // Join the room
      socket.emit("join-room", room);

      // Handle joined room event
      socket.on("joinRoomNavigate", (data) => {
        console.log(
          "User joined room:",
          data.room,
          "Socket ID:",
          data.socketId,
          "Client ID:",
          data.clientId
        );

        if (socket.id === data.socketId) {
          setSelfSocketId(data.socketId);
          setClientId(data.clientId);
        }
      });

      // Handle connected users update
      socket.on("joinedRoomsDetailsPass", (data) => {
        console.log("Room users:", data.connectedUsers);
        setConnectedUsers(data.connectedUsers || []);
      });

      // Handle incoming messages
      socket.on(
        "message",
        (data: {
          msg: string;
          socketId: string;
          clientId: string;
          sender?: string;
        }) => {
          console.log("Received message:", data);
          const fromSelf = data.socketId === selfSocketId;
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              msg: data.msg,
              fromSelf,
              sender:
                data.sender ||
                (fromSelf ? "You" : data.clientId.substring(0, 6)),
            },
          ]);
        }
      );
    }

    // Cleanup socket listeners when the component unmounts
    return () => {
      if (socket) {
        socket.off("joinRoomNavigate");
        socket.off("joinedRoomsDetailsPass");
        socket.off("message");
      }
    };
  }, [socket, room, selfSocketId, decodedEmail]);

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (message.trim() && socket) {
      socket.emit("message", {
        msg: message,
        socketId: selfSocketId,
        clientId: clientId,
        room: room,
        sender: decodedEmail || "You",
      });
      setMessage(""); // Clear input field after sending
    }
  };

  // Handle pressing Enter key to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div>
      <h1>Chat Room {room}</h1>
      <div>
        <p>Your Socket ID: {selfSocketId}</p>
        <p>
          Your Client ID: {clientId ? clientId.substring(0, 6) + "..." : ""}
        </p>
        <p>Your Email: {decodedEmail || "Not provided"}</p>

        <div>
          <h2>Connected Users: {connectedUsers.length}</h2>
          <div
            style={{
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
            }}
          >
            {connectedUsers.map((user, index) => (
              <div key={index}>
                {user.email || user.clientId.substring(0, 6) + "..."}
                {user.socketId === selfSocketId ? " (You)" : ""}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2>Messages</h2>
          <div
            style={{
              height: "300px",
              overflowY: "scroll",
              border: "1px solid #ddd",
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* Render received messages */}
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: message.fromSelf ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <small
                  style={{
                    marginBottom: "2px",
                    color: "#666",
                  }}
                >
                  {message.sender}
                </small>
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "10px",
                    borderRadius: "10px",
                    backgroundColor: message.fromSelf ? "#007bff" : "#ddd",
                    color: message.fromSelf ? "white" : "black",
                    wordWrap: "break-word",
                    textAlign: message.fromSelf ? "right" : "left",
                  }}
                >
                  {message.msg}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              style={{
                width: "80%",
                padding: "10px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                marginRight: "10px",
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: "10px 15px",
                borderRadius: "20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
