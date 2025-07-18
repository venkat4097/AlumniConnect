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
    <div className="bg-[#121212] text-white h-full overflow-y-auto p-4 md:p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Connections</h2>
        <span className="bg-green-600 text-xs px-2 py-1 rounded-full">
          {connections.length} {connections.length === 1 ? 'user' : 'users'}
        </span>
      </div>

      {connections.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-lg font-medium">No connections yet</p>
          <p className="text-sm mt-1">Start chatting to see users here</p>
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
                    ? 'bg-[#1db954]/20 border border-[#1db954]'
                    : 'hover:bg-[#1a1a1a] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#282828] flex items-center justify-center text-white font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#121212] ${
                        isOnline ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                      title={isOnline ? 'Online' : 'Offline'}
                    ></span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate w-40">{user.email}</p>
                  </div>
                </div>

                {unseenCount > 0 && (
                  <span className="bg-red-600 text-white text-xs min-w-5 h-5 flex items-center justify-center px-1 rounded-full">
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
