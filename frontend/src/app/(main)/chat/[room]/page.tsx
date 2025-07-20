"use client";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import {
  addNewMessage,
  getRoomChatHistory,
  updateMessageReadStatus,
} from "@/service/chatService";
import Link from "next/link";
import { getUserDisplayName, getUsersProfileInfo } from "@/service/userService";
import { useSocket } from "@/context/SocketProvider";
import withAuth from "@/lib/hoc/withAuth";

function Chat() {
  const router = useRouter();
  const { room } = useParams();
  const decodedRoom = room ? decodeURIComponent(room as string) : null;
  const socket = useSocket();
  const userEmail = Cookies.get("userEmail");
  const selfUserId = Cookies.get("selfId");
  const chatBuddyUserId = decodedRoom?.replace(selfUserId as string, "");

  const [selfSocketId, setSelfSocketId] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [chatBuddyProfile, setChatBuddyProfile] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  //chat buddy name
  const getChatBuddyDisplayName = async()=>{
    const result = await getUserDisplayName(chatBuddyUserId as string);
    if(result.name){
      console.log(result.name);
      setChatBuddyProfile(result.name);
    }
  }


  // get chat history
  const getMessages = async () => {
    setIsLoading(true);
    try {
      const res = await getRoomChatHistory(room as string);
      if (res?.success) {
        setMessages(res.data[0].messages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //handle mark as read
  const HandleMarkAsRead = async(room : string, user : string) => {
    console.log('mark as read krte hbe mcj gula sob', room, user);
    const result = await updateMessageReadStatus(room , user);
    console.log(result);
  }

  //handle send messages//
  const handleSendMessages = async () => {
    console.log(selfUserId, " ", chatBuddyUserId);
    const messagePayload = {
      senderId: selfUserId,
      receiverId: chatBuddyUserId,
      message: newMessage,
      isRead: false,
    };
    if (!newMessage.trim()) {
      console.log("Message is empty");
      return;
    }

    if (!socket) {
      console.log("Socket not connected");
      return;
    }
    console.log(socket);
    console.log("Sending message:", newMessage, "to room:", room);
    socket.emit("send-message", room, newMessage, selfUserId , chatBuddyUserId);
    const result = await addNewMessage(room as string, messagePayload);
    setNewMessage("");
  };
  console.log(messages);

  
  // -----------------------------------------//
  useEffect(() => {
    getChatBuddyDisplayName();
    getMessages();
    if (socket && room) {
      socket.emit("join-room", room , selfUserId);
      socket.on("room-joined", (room: any , activeUserId : string) => {
      HandleMarkAsRead(room, activeUserId);
      });
      // receive message---------
      socket.on("receive-message", (data) => {
        console.log("Received message:", data);
        if (data) {
          setMessages((prev) => [
            ...prev,
            {
              message: data.message,
              senderId: data.senderId,
            },
          ]);
        }
      });
    }
  }, [socket, room]);

  console.log(messages);
 
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessages();
    }
  };

  // Format timestamp
  const formatTime = (timestamp: string | undefined) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  // Scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
          <button
            onClick={() => router.push("/chat")}
            className="text-blue-500 hover:text-blue-700 mr-4 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1">Back</span>
          </button>

          <div className="flex-1 flex items-center">
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="ml-3">
                  <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href={`/user-profile/${chatBuddyUserId}`}
                  className="flex items-center group"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold ring-2 ring-blue-100">
                    {chatBuddyProfile?.[0] || "?"}
                  </div>
                  <div className="ml-3">
                    <h1 className="font-medium text-gray-900 group-hover:text-blue-600 transition">
                      {chatBuddyProfile || "Chat Buddy"}
                    </h1>
                  </div>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 pb-4 pt-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div
            ref={messagesContainerRef}
            className="bg-white rounded-xl shadow-sm h-[600px] overflow-y-auto p-4 mb-4"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  No messages yet
                </h3>
                <p className="text-gray-500 max-w-xs">
                  Send a message to {chatBuddyProfile || "your buddy"} to
                  start the conversation!
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <div className="flex justify-center mb-3"></div>
                  {/*messages history */}
                  <div>
                    {messages.map((msg: any , index:number) => (
                      <div className="" key={index}>
                        {msg.senderId === selfUserId ? (
                          <div className="w-full flex justify-end">
                            <div className="bg-blue-500 px-[12px] py-[8px] my-[6px] rounded-[12px] text-white">
                              {msg.message}
                            </div>
                          </div>
                        ) : (
                          <>
                            {" "}
                            <div className="w-full flex justify-start">
                              <div className="bg-base-300 px-[12px] py-[8px] my-[6px] rounded-[12px] text-gray-700">
                                {msg.message}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Message Input */}
        <div className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${chatBuddyProfile || ""}...`}
            className="flex-1 py-3 px-4 bg-gray-50 border border-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessages}
            disabled={!newMessage.trim() || isLoading}
            className={`p-3 rounded-full text-white shadow-sm transition-all ${
              newMessage.trim() && !isLoading
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Chat);
