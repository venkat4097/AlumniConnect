import { useEffect, useState } from "react";
import axiosInstance from "../config/axios";
import { useChat } from "../contexts/ChatContext";
import { useAuth } from "../contexts/AuthContext";

const ChatSidebar = () => {
  const { token } = useAuth();
  const { setSelectedUser,selectedUser, onlineUsers,unseenCounts} = useChat();
  const [connections, setConnections] = useState([]);

  // 🔄 Fetch connected users
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axiosInstance.get("/connections");
        setConnections(res.data.connections || []);
      } catch (err) {
        console.error("❌ Failed to fetch connections:", err.message);
      }
    };

    if (token) fetchConnections();
  }, [token]);

// ChatSidebar.jsx


return (
  <div className="w-80 bg-white border-r border-gray-100 p-5 overflow-y-auto">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-800">Connections</h2>
      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
        {connections.length} {connections.length === 1 ? 'user' : 'users'}
      </span>
    </div>

    {connections.length === 0 ? (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg font-medium">No connections yet</p>
        <p className="text-sm text-gray-400 mt-1">Start chatting to see users here</p>
      </div>
    ) : (
      <div className="space-y-2">
        {connections.map((user) => {
          const isOnline = onlineUsers[user._id];
          const unseenCount = unseenCounts[user._id] || 0;

          return (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                selectedUser?._id === user._id
                  ? 'bg-blue-50 border border-blue-100'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      isOnline ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    title={isOnline ? "Online" : "Offline"}
                  ></span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate w-40">{user.email}</p>
                </div>
              </div>

              {unseenCount > 0 && (
                <span className="bg-red-500 text-white text-xs min-w-5 h-5 flex items-center justify-center px-1 rounded-full">
                  {unseenCount}
                </span>
              )}
            </div>
          );
        })}
      </div>
    )}
  </div>
);


};

export default ChatSidebar;
