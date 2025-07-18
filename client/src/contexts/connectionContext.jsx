import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axiosInstance from "../config/axios.js";
const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
  const { token } = useAuth();

  const [connections, setConnections] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const sendConnectionRequest = async (alumniId) => {
    try {
      const res = await axiosInstance.post(`/connections/send/${alumniId}`);
      return { success: true, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to send request",
      };
    }
  };

  // ✅ Accept a connection request
  const acceptRequest = async (studentId) => {
    try {
      const res = await axiosInstance.post(`/connections/accept/${studentId}`);
      return { success: true, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to accept request",
      };
    }
  };

  // ❌ Reject a connection request
  const rejectRequest = async (studentId) => {
    try {
      const res = await axiosInstance.post(`/connections/reject/${studentId}`);
      return { success: true, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to reject request",
      };
    }
  };

  // 📥 Get incoming requests (for alumni)
  const fetchIncomingRequests = async () => {
    try {
      const res = await axiosInstance.get("/connections/requests");
      setIncomingRequests(res.data);
    }
    catch (err) {
      console.error("Error fetching incoming requests:", err.message);
    }
  };

  // 🤝 Get existing connections
const getConnections = async () => {
  try {
    const res = await axiosInstance.get("/connections");
    setConnections(res.data.connections || []);
    setIncomingRequests(res.data.requests || []);
    setSentRequests(res.data.sent || []);
  } catch (err) {
    console.error("Error fetching connections:", err.message);
  }
};


const respondToRequest = async (studentId, action) => {
  if (action === "accept") return await acceptRequest(studentId);
  if (action === "reject") return await rejectRequest(studentId);
};

  return (
    <ConnectionContext.Provider
      value={{
        sendConnectionRequest,
        acceptRequest,
        rejectRequest,
        fetchIncomingRequests,
        getConnections,
        incomingRequests,
        connections,
        sentRequests,
        respondToRequest,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => useContext(ConnectionContext);
