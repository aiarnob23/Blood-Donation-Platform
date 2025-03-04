import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { conversationServices } from "./conversation.service";

// get message history by room ID
const getConversationHistory = catchAsync(async (req, res) => {
  const roomId = req?.query?.roomId as string;
  if (!roomId) {
    sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "No chat found",
      data: null,
    });
  }
  const result = await conversationServices.getRoomMessageHistory(roomId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "conversation details found",
    data: result,
  });
});


export const conversationControllers = {
    getConversationHistory,
}