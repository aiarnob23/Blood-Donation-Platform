import { serverBaseUrl } from "@/utils/serverUrl";

export const getUsersChatLists = async (email: string) => {
  try {
    const response = await fetch(`${serverBaseUrl}/user/chat-lists/${email}`);
    const data = await response.json();

    if (!data?.data) return [];

    const conversationArray = data.data.conversation;
    const payload = await fetch(`${serverBaseUrl}/user/user-id/${email}`);
    const payload_json = await payload.json();
    const self_id = payload_json?.data?._id;

    if (!self_id) return []; 

    const userFetchPromises = conversationArray
      .filter((chatList: any) => chatList?.messages?.length) 
      .map(async (chatList: any) => {
        const lastMessage = chatList.messages[chatList.messages.length - 1];
        const { senderId, receiverId, isRead, timestamp, message } =
          lastMessage;
        const roomId = chatList.roomId;

        const chatBuddyId = senderId === self_id ? receiverId : senderId;

        return fetch(`${serverBaseUrl}/user/profile-view/${chatBuddyId}`)
          .then((res) => res.json())
          .then((user_json) => ({
            ownMessage: senderId === self_id,
            chatBuddy: user_json?.data?.name,
            roomId,
            isRead,
            timestamp,
            messageData: message,
          }))
          .catch(() => null); 
      });

    // Use Promise.allSettled to avoid complete failure
    const chatLists = (await Promise.allSettled(userFetchPromises))
      .filter((result) => result.status === "fulfilled" && result.value) 
      .map((result : any) => result.value);

    return chatLists;
  } catch (error) {
    console.error("Error fetching chat lists:", error);
    return [];
  }
};
