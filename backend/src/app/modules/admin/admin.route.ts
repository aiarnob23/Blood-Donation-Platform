import express from "express";
import { adminControllers } from "./admin.controller";
const router = express.Router();

router.get("/all-users", adminControllers.getAllUsersList);
router.get("/all-posts", adminControllers.getUsersPosts);
router.get("/all-appointments", adminControllers.getAllAppointments);

export const adminRoutes = router;
