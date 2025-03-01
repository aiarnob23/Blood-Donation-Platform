import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/register",userController.RegisterUser);
router.get(`/info`, userController.FindUserInfoByUserEmail);
export const userRoutes = router;
