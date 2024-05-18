import { NextApiResponseServerIo } from "@/lib/types";
import { get, Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { NextApiRequest } from "next";
import * as dotenv from "dotenv";
import { getURL } from "@/lib/utils";
import e from "cors";
import { createLogs, createMessage } from "@/lib/supabase/queries";
dotenv.config({ path: ".env" });

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;

    const io = new ServerIO(httpServer, {
      path,
      cors: {
        origin: process.env.NEXT_PUBLIC_SITE_URL,
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (s) => {
      s.on("create-room", (fileId) => {
        s.join(fileId);
      });
      // here we listen for changes and emit them to the room specified by the fileId and deltas means data changes
      s.on("send-changes", (deltas, fileId) => {
        console.log("CHANGE server");
        s.to(fileId).emit("receive-changes", deltas, fileId);
      });

      // here we listen for cursor move and emit them to the room specified by the fileId and cursorId means user id
      s.on("send-cursor-move", (range, fileId, cursorId) => {
        console.log("server CURSOR");
        s.to(fileId).emit("receive-cursor-move", range, fileId, cursorId);
      });

      s.on("send-message", async (message, fileId, email, userId) => {
        // save message to db
        await createMessage(message, userId, fileId);

        console.log("server MESSAGE", message, message);
        console.log("server fileId", fileId);
        console.log("server userId", email);

        const data = {
          senderEmail: email,
          message: message,
          fileId: fileId,
        };

        s.to(fileId).emit("receive-message", data);
      });

   
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
