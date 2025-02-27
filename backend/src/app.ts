import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

// cors and middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors());

//app 
app.get("/", (req: Request, res: Response) => {
    res.send("Blood donation backend");
})

export default app;