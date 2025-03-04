import { Conversation } from "./conversation.model";

const getRoomMessageHistory = async (roomId: string) => {
  const result = await Conversation.find({ roomId: roomId });
  return result;
};

export const conversationServices = {
  getRoomMessageHistory,
};
