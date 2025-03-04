"use client";
import { AuthContext } from "@/context/AuthContext";
import { getUsersChatLists } from "@/service/chatService";
import { useContext, useEffect } from "react";

   
export default function ChatPage() {
   const authContext = useContext(AuthContext);
   if (!authContext) {
     throw new Error("AuthContext is not provided.");
   }
   const { user } = authContext;
  useEffect(() => {
    const getChatLists = async () => {
      const res = await getUsersChatLists(user?.email as string);
    }
    getChatLists();
  })
  return (
      <div> 
         
      </div>
  );
}