import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/register", userController.RegisterUser);
router.get(`/info`, userController.selfProfileInfo);
router.get(`/profile-view/:userId`, userController.getUserDetails);
router.get(`/profile-image/:email`, userController.getUsersProfileImage);
router.get(`/user-id/:email`, userController.getUsersId);
router.get("/donors-lists", userController.getDonorLists);
router.patch(`/update/:id`,userController.updateUsersDetails);
router.get(`/chat-lists/:email`, userController.findUsersChatLists);
router.get(`/display-name/:id`, userController.getUserDisplayName);
export const userRoutes = router;
