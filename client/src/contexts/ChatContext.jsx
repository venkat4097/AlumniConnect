import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import axiosInstance from "../config/axios";

const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [unseenCounts, setUnseenCounts] = useState({}); // userId -> count

  const bottomRef = useRef(null);

  // 📡 1. Initialize Socket
  useEffect(() => {
    if (!user?._id) return;

    const newSocket = io("https://alumniconnect-backend-ha93.onrender.com", {
      query: { userId: user._id },
    });

    newSocket.on("receive-message", (msg) => {
      setIncomingMessage(msg);

      const senderId = msg.sender._id || msg.sender;

      if (!selectedUser || senderId !== selectedUser._id) {
        setUnseenCounts((prev) => ({
          ...prev,
          [senderId]: (prev[senderId] || 0) + 1,
        }));
      }
    });

    newSocket.on("online-users", (userIds) => {
      const onlineMap = {};
      userIds.forEach((id) => (onlineMap[id] = true));
      setOnlineUsers(onlineMap);
    });

    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [user, selectedUser]);

  // 📥 2. Fetch messages for selected user
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      try {
        const res = await axiosInstance.get(`/messages/${selectedUser._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err.message);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  // 📩 3. Handle new incoming message
  useEffect(() => {
    if (
      incomingMessage &&
      selectedUser &&
      (incomingMessage.sender === selectedUser._id ||
        incomingMessage.sender?._id === selectedUser._id)
    ) {
      setMessages((prev) => [...prev, incomingMessage]);

      socket.emit("mark-seen", { messageIds: [incomingMessage._id] });
      setIncomingMessage(null);
    }
  }, [incomingMessage, selectedUser]);

  // ✅ Reset unseen count on user switch
  useEffect(() => {
    if (selectedUser?._id) {
      setUnseenCounts((prev) => {
        const updated = { ...prev };
        delete updated[selectedUser._id];
        return updated;
      });
    }
  }, [selectedUser]);

  // 📨 4. Send message
  const sendMessage = async (text) => {
  if (!text.trim() || !selectedUser) return;

  const msgObj = {
    senderId: user._id,
    receiverId: selectedUser._id,
    content: text,
  };

  // 👇 Fix: Include `sender` as object instead of raw string
  const tempMessage = {
    ...msgObj,
    sender: { _id: user._id, name: user.name }, // 👈 mimic real populated message
    createdAt: new Date().toISOString(),
    seen: false,
  };

  // Push to UI immediately
  setMessages((prev) => [...prev, tempMessage]);

  // Emit to socket
  socket.emit("send-message", msgObj);
};

  return (
    <ChatContext.Provider
      value={{
        socket,
        onlineUsers,
        unseenCounts,
        selectedUser,
        setSelectedUser,
        messages,
        setMessages,
        sendMessage,
        bottomRef,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
