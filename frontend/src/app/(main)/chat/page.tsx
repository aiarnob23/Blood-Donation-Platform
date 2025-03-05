"use client";
import { AuthContext } from "@/context/AuthContext";
import { getUsersChatLists } from "@/service/chatService";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function ChatPage() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided.");
  }
  const { user } = authContext;
  const [chatLists, setChatLists] = useState<any>([]);

  useEffect(() => {
    const getChatLists = async () => {
      const res = await getUsersChatLists(user?.email as string);
      setChatLists(res);
      console.log(chatLists);
    };
    getChatLists();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Chats</h2>
      <div className="space-y-3">
        {chatLists.length === 0 ? (
          <p className="text-gray-500">No conversations yet.</p>
        ) : (
          chatLists.map((chatInfo: any) => (
            <Link href={`/chat/${chatInfo.roomId}`} key={chatInfo.roomId}>
              <div
                className={`flex items-center gap-3 p-3 rounded-lg border shadow-sm cursor-pointer transition ${
                  chatInfo.isRead ? "bg-white" : "bg-blue-100"
                } hover:bg-gray-100`}
              >
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-white">
                  {chatInfo.chatBuddy[0]}
                </div>

                {/* Chat Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{chatInfo.chatBuddy}</h3>
                  <p
                    className={`text-sm ${
                      chatInfo.ownMessage
                        ? "text-gray-600"
                        : "text-blue-600 font-semibold"
                    }`}
                  >
                    {chatInfo.ownMessage ? "You: " : ""}
                    {chatInfo.messageData}
                  </p>
                </div>

                {/* Timestamp */}
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(chatInfo.timestamp), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
