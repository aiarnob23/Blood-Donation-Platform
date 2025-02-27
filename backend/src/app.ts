import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "./app/modules/user/user.routes";

const app: Application = express();

// cors and middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors());

//app 
app.use("/api/user", userRoutes);
app.get("/", (req: Request, res: Response) => {
    res.send("Blood donation backend");
})

export default app;