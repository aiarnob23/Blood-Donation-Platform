import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "./app/modules/user/user.route";
import { postRoutes } from "./app/modules/post/post.route";
import { conversationRoutes } from "./app/modules/conversation/conversation.route";
import { adminRoutes } from "./app/modules/admin/admin.route";
import { appointmentRoutes } from "./app/modules/appointment/appointment.route";
import { bloodBankRoutes } from "./app/modules/blood-banks/blood-bank.route";
import { campaignRoutes } from "./app/modules/campaign/campaign.route";

const app: Application = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://blood-donation-platform-phi.vercel.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders:['Content-Type' , 'Authorization', 'X-Requested-With'],
  })
);


// API Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/blood-banks", bloodBankRoutes);
app.use("/api/campaigns", campaignRoutes);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Blood donation backend");
});

export default app;
