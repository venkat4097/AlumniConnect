import { useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";

const ChatPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Sidebar Toggle Button for Mobile */}
      <div className="md:hidden bg-[#1DB954] p-2 text-center">
        <button
          className="text-white font-semibold"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? "Hide" : "Show"} Sidebar
        </button>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <div className="md:w-1/3 lg:w-1/4 w-full border-r border-gray-700">
          <ChatSidebar />
        </div>
      )}

      {/* Chat Window */}
      <div className="flex-1 overflow-hidden">
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;
