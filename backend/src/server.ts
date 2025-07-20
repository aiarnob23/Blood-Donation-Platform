import app from "./app";
import connectDB from "./app/config/db";
import http from "http";
import { initiateSocket } from "./app/socket";

async function main() {
  try {
    await connectDB();
    const httpServer = http.createServer(app);
    const io = initiateSocket(httpServer);
    httpServer.listen(4000, () => {
      console.log("Blood donation server is running on port 4000");
      console.log("Socket.IO server is ready");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
