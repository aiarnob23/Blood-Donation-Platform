import { serverBaseUrl } from "@/utils/serverUrl";

export const getUsersChatLists = async (email: string) => {
  try {
    const response = await fetch(`${serverBaseUrl}/user/chat-lists/${email}`);
    const data = await response.json();
    const chats = data?.data?.conversation;
    let chatLists = [];
    if (data?.data) {
      
    }
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};
