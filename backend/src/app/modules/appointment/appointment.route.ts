import express from "express";
import { appointmentControllers } from "./appointment.controller";
const router = express.Router();

router.post("/create", appointmentControllers.addAppointment);
router.get(`/user-appointments/:id`, appointmentControllers.getAppointment);

export const appointmentRoutes = router;
