import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectionRoutes from "./routes/connectionRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

// Models
import Message from "./models/Message.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Initialize Socket.IO server
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    credentials: true,
  },
});

// ✅ In-memory store for online users: userId -> socketId
export const userSocketMap = {};

// 🔄 Broadcast updated list of online users
const broadcastOnlineUsers = () => {
  io.emit("online-users", Object.keys(userSocketMap));
};

// 📡 Handle Socket.IO connections
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`✅ ${userId} connected`);
    broadcastOnlineUsers();
  }

  // 💬 Handle message sending
  socket.on("send-message", async ({ senderId, receiverId, content }) => {
    try {
      const newMessage = await Message.create({ sender: senderId, receiver: receiverId, content });
      const populatedMsg = await newMessage.populate("sender", "_id name");

      const receiverSocketId = userSocketMap[receiverId];
      const senderSocketId = userSocketMap[senderId];
      if (receiverSocketId)
         io.to(receiverSocketId).emit("receive-message", populatedMsg);

    } catch (err) {
        console.error("❌ Message sending error:", err.message);
    }
  });

  // ✅ Handle seen status
  socket.on("mark-seen", async ({ messageIds }) => {
    try {
      await Message.updateMany({ _id: { $in: messageIds } }, { seen: true });
    } catch (err) {
      console.error("❌ Seen update error:", err.message);
    }
  });

  // ❌ Handle disconnection
  socket.on("disconnect", () => {
    console.log(`❌ ${userId} disconnected`);
    delete userSocketMap[userId];
    broadcastOnlineUsers();
  });
});

// 🛡️ Middleware
app.use(cors());
app.use(express.json());

// 🧭 Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/api/messages", messageRoutes);

// 🔁 Test Route
app.get("/", (req, res) => res.send("🌐 Alumni Portal API is running..."));

// 🚀 Start server after DB connection
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () =>
    console.log(`🚀 Server + Socket.IO running on port ${PORT}`)
  );
});
