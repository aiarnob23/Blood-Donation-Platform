import express from "express";
import { conversationControllers } from "./conversation.controller";

const router = express.Router();

router.get('/chat-room', conversationControllers.getConversationHistory);

export const conversationRoutes = router;